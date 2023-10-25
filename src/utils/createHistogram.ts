import { ChartData } from "chart.js";

interface HistogramProps {
  days: string[] | number[];
  hours: number[];
}

export function CreateHistrogram({
  days,
  hours,
}: HistogramProps): ChartData<"bar"> {
  const data: ChartData<"bar"> = {
    labels: days,
    datasets: [
      {
        label: "Horas trabalhadas",
        data: hours,
        borderWidth: 1,
      },
    ],
  };

  return data;
}
