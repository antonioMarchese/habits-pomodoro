export default function CalculateTotalMinutes(
  minutesAmount: number,
  amountSecondsPassedBeforePause?: number
) {
  const totalMinutes =
    minutesAmount +
    (amountSecondsPassedBeforePause ? amountSecondsPassedBeforePause / 60 : 0);

  return totalMinutes;
}
