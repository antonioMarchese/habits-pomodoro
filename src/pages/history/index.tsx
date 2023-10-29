import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { differenceInDays } from "date-fns";

import { HistoryContainer } from "./styles";
import { CyclesContext } from "../../context/cyclesContext";

import formatWorkDuration from "../../utils/formatWorkDuration";
import formatCycleCreatedAt from "../../utils/formatCycleCreatedAt";
import { ExportExcelData } from "../../utils/excelExporter";
import CreateToast from "../../utils/createToast";
import {
  ErrorCyclesExportedToast,
  SuccessCyclesExportedToast,
} from "../../utils/toasts";

import Header from "./header";
import HistoryTable from "./historyTable";
import ChartContainer from "./chartsContainer";

export function History() {
  const { cycles, handleSortCycles } = useContext(CyclesContext);

  const [filterTitle, setFilterTitle] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [activeSection, setActiveSection] = useState<"table" | "charts">(
    "table"
  );

  function handleCleanFilter() {
    setFilterDate("");
    setFilterTitle("");
  }

  function handleToggleActiveSection() {
    setActiveSection((prevState) =>
      prevState === "charts" ? "table" : "charts"
    );
  }

  async function exportXLSX() {
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
      cycle.task.toLowerCase().includes(filterTitle.toLowerCase()) &&
      (filterDate
        ? differenceInDays(
            new Date(String(cycle.startDate).slice(0, 10)),
            Date.parse(filterDate)
          ) === 0
        : true)
  );

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
      <Header
        activeSection={activeSection}
        exportXLSX={exportXLSX}
        filterDate={filterDate}
        filterTitle={filterTitle}
        handleCleanFilter={handleCleanFilter}
        setFilterDate={setFilterDate}
        setFilterTitle={setFilterTitle}
        toggleActiveSection={handleToggleActiveSection}
      />
      {activeSection === "table" && (
        <HistoryTable
          filteredCycles={filteredCycles}
          sortCycles={handleSortCycles}
        />
      )}
      {activeSection === "charts" && <ChartContainer />}
    </HistoryContainer>
  );
}
