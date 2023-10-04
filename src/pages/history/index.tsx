import { useContext, useEffect } from "react";
import { HistoryContainer, HistoryHeader, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../context/cyclesContext";

import { Link } from "react-router-dom";
import { BaseButton } from "../../components/button";
import { Trash } from "phosphor-react";
import formatWorkDuration from "../../utils/formatWorkDuration";
import formatCycleCreatedAt from "../../utils/formatCycleCreatedAt";

export function History() {
  const { cycles, clearCyclesHistory, activeCycleId } =
    useContext(CyclesContext);

  useEffect(() => {
    document.title = "Histórico";
  }, []);

  const isClearButtonDisabled =
    cycles.length === 1 && cycles[0].id === activeCycleId;

  if (cycles.length === 0)
    return (
      <HistoryContainer>
        <h1 className="empty">
          Você ainda não possui nenhuma jornada registrada
        </h1>
        <p className="empty">
          Clique <Link to={"/"}>aqui</Link> para começar uma
        </p>
      </HistoryContainer>
    );
  return (
    <HistoryContainer>
      <HistoryHeader>
        <h1>Meu Histórico</h1>
        <BaseButton
          disabled={isClearButtonDisabled}
          onClick={clearCyclesHistory}
        >
          <Trash size={24} />
          Limpar histórico
        </BaseButton>
      </HistoryHeader>

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
            {cycles.map((cycle) => (
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
    </HistoryContainer>
  );
}
