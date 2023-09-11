import { useContext, useEffect } from "react";
import { CountdownContainer, TimerSeparator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../context/cyclesContext";

export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext);

  const secondsAmount = activeCycle ? 60 * activeCycle.minutesAmount : 0;
  const currentSeconds = activeCycle ? secondsAmount - amountSecondsPassed : 0;

  const minutesLeft = Math.floor(currentSeconds / 60);
  const secondsLeft = currentSeconds % 60;

  const minutes = String(minutesLeft).padStart(2, "0");
  const seconds = String(secondsLeft).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${activeCycle.task} - ${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const timeDelta = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );
        if (timeDelta > secondsAmount) {
          markCurrentCycleAsFinished();
          clearInterval(interval);
        } else {
          setSecondsPassed(timeDelta);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    activeCycleId,
    secondsAmount,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <TimerSeparator>:</TimerSeparator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
