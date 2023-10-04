export default function formatWorkDuration(
  minutesAmount: number,
  amountSecondsPassedBeforePause?: number
) {
  const totalMinutes =
    minutesAmount +
    (amountSecondsPassedBeforePause ? amountSecondsPassedBeforePause / 60 : 0);

  if (totalMinutes % 60 === 0) {
    return `${totalMinutes / 60} ${totalMinutes / 60 === 1 ? "hora" : "horas"}`;
  } else if (totalMinutes > 60) {
    return `${Math.floor(totalMinutes / 60)}h e ${Math.floor(
      totalMinutes % 60
    )}min`;
  } else if (totalMinutes < 1) {
    return "<1 minuto";
  } else return totalMinutes.toFixed(0) + " minutos";
}
