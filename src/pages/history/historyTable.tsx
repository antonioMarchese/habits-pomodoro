import { useContext } from "react";
import { CycleProps, CyclesContext } from "../../context/cyclesContext";
import formatCycleCreatedAt from "../../utils/formatCycleCreatedAt";
import formatWorkDuration from "../../utils/formatWorkDuration";
import { HistoryList, Status } from "./styles";

interface HistoryTableProps {
  filteredCycles: CycleProps[];
}

export default function HistoryTable({ filteredCycles }: HistoryTableProps) {
  const { activeCycleId } = useContext(CyclesContext);
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
          {filteredCycles.map((cycle) => (
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
    </HistoryList>
  );
}
