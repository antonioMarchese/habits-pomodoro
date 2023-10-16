import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowCounterClockwise,
  DotsThreeCircle,
  FileXls,
  Trash,
} from "phosphor-react";

import { differenceInDays } from "date-fns";

import {
  ButtonContainer,
  HistoryContainer,
  HistoryHeader,
  HistoryList,
  LeftHeader,
  Status,
  NavigationMenuRoot,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  FilterContainer,
  NavigationMenuIndicator,
  Arrow,
  ViewPortPosition,
  NavigationMenuViewport,
} from "./styles";
import { CyclesContext } from "../../context/cyclesContext";

import { BaseButton } from "../../components/button";
import formatWorkDuration from "../../utils/formatWorkDuration";
import formatCycleCreatedAt from "../../utils/formatCycleCreatedAt";
import { ExportExcelData } from "../../utils/excelExporter";
import CreateToast from "../../utils/createToast";
import {
  ErrorCyclesExportedToast,
  SuccessCyclesExportedToast,
} from "../../utils/toasts";
import { BaseInput } from "../../components/Input";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

export function History() {
  const { cycles, clearCyclesHistory, activeCycleId } =
    useContext(CyclesContext);

  const [filterTitle, setFilterTitle] = useState("");
  const [filterDate, setFilterDate] = useState("");

  function handleCleanFilter() {
    setFilterDate("");
    setFilterTitle("");
  }

  async function ExportXLSX() {
    if (filteredCycles.length > 0) {
      const cyclesToExport = filteredCycles.map((cycle) => ({
        Jornada: cycle.task,
        Duração: formatWorkDuration(
          cycle.rounds * cycle.minutesAmount,
          cycle.amountSecondsPassedBeforePause
        ),
        Rounds: cycle.rounds,
        Início: formatCycleCreatedAt(cycle.startDate),
      }));

      await ExportExcelData({
        excelData: cyclesToExport,
        fileName: "HabitsPomodoro",
      }).then(() => CreateToast(SuccessCyclesExportedToast));
    } else {
      CreateToast(ErrorCyclesExportedToast);
    }
  }

  useEffect(() => {
    document.title = "Histórico";
  }, []);

  const filteredCycles = cycles.filter(
    (cycle) =>
      cycle.task.includes(filterTitle) &&
      (filterDate
        ? differenceInDays(
            new Date(String(cycle.startDate).slice(0, 10)),
            Date.parse(filterDate)
          ) === 0
        : true)
  );

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
        <LeftHeader>
          <h1>Meu Histórico</h1>
          <FilterContainer>
            <h2>Filtrar por</h2>
            <BaseInput
              value={filterTitle}
              onChange={(e) => setFilterTitle(e.target.value)}
              placeholder="Título"
            />
            <BaseInput
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
            {(filterDate || filterTitle) && (
              <ArrowCounterClockwise
                size={24}
                onClick={handleCleanFilter}
                className="reset-filter"
              />
            )}
          </FilterContainer>
        </LeftHeader>
        <ButtonContainer>
          <NavigationMenuRoot>
            <NavigationMenuList>
              <NavigationMenu.Item>
                <NavigationMenuTrigger>
                  <DotsThreeCircle size={24} />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <BaseButton
                    disabled={cycles.length === 0}
                    onClick={() => ExportXLSX()}
                    className="first-child"
                  >
                    <FileXls size={24} />
                    Gerar relatório
                  </BaseButton>
                  <BaseButton
                    disabled={isClearButtonDisabled}
                    onClick={clearCyclesHistory}
                    className="last-child"
                  >
                    <Trash size={24} />
                    Limpar histórico
                  </BaseButton>
                </NavigationMenuContent>
              </NavigationMenu.Item>

              <NavigationMenuIndicator>
                <Arrow />
              </NavigationMenuIndicator>
            </NavigationMenuList>

            <ViewPortPosition>
              <NavigationMenuViewport />
            </ViewPortPosition>
          </NavigationMenuRoot>
        </ButtonContainer>
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
    </HistoryContainer>
  );
}
