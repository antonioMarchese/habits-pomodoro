import { useContext, useState } from "react";
import { CycleProps, CyclesContext } from "../../context/cyclesContext";
import formatCycleCreatedAt from "../../utils/formatCycleCreatedAt";
import formatWorkDuration from "../../utils/formatWorkDuration";
import { HistoryList, Paginator, Status } from "./styles";
import { CaretLeft, CaretRight } from "phosphor-react";
import { BaseButton } from "../../components/button";

const ITEMS_PER_PAGE = 10;

interface HistoryTableProps {
  filteredCycles: CycleProps[];
}

export default function HistoryTable({ filteredCycles }: HistoryTableProps) {
  const { activeCycleId } = useContext(CyclesContext);
  const [cyclesOffset, setCyclesOffset] = useState(0);

  const endOffset = cyclesOffset + ITEMS_PER_PAGE;

  const currentCycles = filteredCycles.slice(cyclesOffset, endOffset);

  function handleSkipPage() {
    setCyclesOffset((prevState) => prevState + ITEMS_PER_PAGE);
  }

  function handleBackPage() {
    setCyclesOffset((prevState) => prevState - ITEMS_PER_PAGE);
  }

  return (
    <HistoryList>
      <table>
        <thead>
          <tr>
            <th>Jornada</th>
            <th>Tempo de trabalho</th>
            <th>Rounds</th>
            <th>Início</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentCycles.map((cycle) => (
            <tr key={cycle.id}>
              <td>{cycle.task}</td>
              <td>
                {cycle.id === activeCycleId
                  ? `${cycle.minutesAmount} minutos`
                  : formatWorkDuration(
                      cycle.rounds * cycle.minutesAmount,
                      cycle.amountSecondsPassedBeforePause
                    )}
              </td>
              <td>{cycle.rounds}</td>
              <td>{formatCycleCreatedAt(cycle.startDate)}</td>
              <td>
                {cycle.finishedDate && (
                  <Status statuscolor="green">Concluído</Status>
                )}
                {cycle.interruptedDate && (
                  <Status statuscolor="red">Interrompido</Status>
                )}
                {!cycle.finishedDate && !cycle.interruptedDate && (
                  <Status statuscolor="yellow">Em andamento</Status>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Paginator>
        <BaseButton disabled={cyclesOffset === 0}>
          <CaretLeft size={24} onClick={handleBackPage} />
        </BaseButton>
        <BaseButton disabled={endOffset >= filteredCycles.length}>
          <CaretRight size={24} onClick={handleSkipPage} />
        </BaseButton>
      </Paginator>
    </HistoryList>
  );
}
