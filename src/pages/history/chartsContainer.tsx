import { useContext, useState } from "react";
import { ChartsContainer, ReportChartContainer } from "./styles";
import {
  endOfWeek,
  isWithinInterval,
  startOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";

import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import { CycleProps, CyclesContext } from "../../context/cyclesContext";

import { weekDays } from "../../utils/weekDays";
import { CreateHistrogram } from "../../utils/createHistogram";
import { getMonthDays } from "../../utils/getMonthDays";
import { SettingsContext } from "../../context/settingsContext";

Chart.register(CategoryScale);

export default function ChartContainer() {
  const { cycles } = useContext(CyclesContext);
  const { theme } = useContext(SettingsContext);

  const [weeklyReportChartData] = useState(
    CreateHistrogram({
      days: weekDays,
      hours: formatDataToWeeklyReportPlot(),
    })
  );

  const [monthlyReportChartData] = useState(
    CreateHistrogram({
      days: getMonthDays(new Date()),
      hours: formatDataToMonthlyReportPlot(),
    })
  );

  const chartOptions =
    theme === "dark"
      ? {
          scales: {
            x: {
              grid: {
                color: "#ffffff1d",
              },
              ticks: {
                color: "#ffffff73",
              },
            },
            y: {
              grid: {
                color: "#ffffff1d",
              },
              ticks: {
                color: "#ffffff73",
              },
            },
          },
        }
      : {};

  function formatDataToWeeklyReportPlot() {
    const today = new Date();
    const startOfCurrentWeek = startOfWeek(today);
    const endOfCurrentWeek = endOfWeek(today);

    const currentWeekCycles = cycles.filter((cycle) =>
      isWithinInterval(new Date(cycle.startDate), {
        start: startOfCurrentWeek,
        end: endOfCurrentWeek,
      })
    );

    const data = weekDays.map((_, weekDayNumber) =>
      currentWeekCycles.reduce((acc: number, cycle: CycleProps) => {
        if (new Date(cycle.startDate).getDay() === weekDayNumber) {
          const totalMinutes =
            cycle.rounds * cycle.minutesAmount +
            (cycle.amountSecondsPassedBeforePause ?? 0);
          return Math.round((acc + totalMinutes / 3600) * 100) / 100;
        }
        return acc;
      }, 0)
    );

    return data;
  }

  function formatDataToMonthlyReportPlot() {
    const today = new Date();
    const startOfcurrentMonth = startOfMonth(today);
    const endOfcurrentMonth = endOfMonth(today);

    const currentMonthCycles = cycles.filter((cycle) =>
      isWithinInterval(new Date(cycle.startDate), {
        start: startOfcurrentMonth,
        end: endOfcurrentMonth,
      })
    );

    const data = getMonthDays(today).map((monthDay) =>
      currentMonthCycles.reduce((acc: number, cycle: CycleProps) => {
        if (new Date(cycle.startDate).getDate() === monthDay) {
          const totalMinutes =
            cycle.rounds * cycle.minutesAmount +
            (cycle.amountSecondsPassedBeforePause ?? 0);
          return Math.round((acc + totalMinutes / 3600) * 100) / 100;
        }
        return acc;
      }, 0)
    );

    return data;
  }
  return (
    <ChartsContainer>
      <ReportChartContainer>
        <p>Relatório semanal</p>
        <Bar data={weeklyReportChartData} options={chartOptions} />
      </ReportChartContainer>
      <ReportChartContainer>
        <p>Relatório mensal</p>
        <Bar data={monthlyReportChartData} options={chartOptions} />
      </ReportChartContainer>
    </ChartsContainer>
  );
}
