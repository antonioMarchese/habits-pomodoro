import { useContext, useEffect } from "react";
import { CountdownContainer, TimerSeparator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../context/cyclesContext";
import { SettingsContext } from "../../../../context/settingsContext";

export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    setStopRest,
    markCurrentRoundAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext);
  const { roundsAmount } = useContext(SettingsContext);

  // substituir esse 60 * 10 por activeCycle.restMinutesAmount
  const secondsAmount = activeCycle
    ? activeCycle.isInRest
      ? 60 * activeCycle.restMinutesAmount
      : 60 * activeCycle.minutesAmount
    : 0;
  /* const currentSeconds = activeCycle ? secondsAmount - amountSecondsPassed : 0;

  const minutesLeft = Math.floor(currentSeconds / 60);
  const secondsLeft = currentSeconds % 60; */

  const minutes = activeCycle
    ? String(Math.floor(amountSecondsPassed / 60)).padStart(2, "0")
    : "00";
  const seconds = activeCycle
    ? String(Math.floor(amountSecondsPassed % 60)).padStart(2, "0")
    : "00";

  useEffect(() => {
    if (activeCycle) {
      document.title = `${activeCycle.task} - ${minutes}:${seconds}`;
    } else {
      document.title = "Habits Pomodoro";
    }
  }, [minutes, seconds, activeCycle]);

  useEffect(() => {
    let interval: number;

    if (activeCycle && !activeCycle.isPaused) {
      interval = setInterval(() => {
        const timeDelta = differenceInSeconds(
          new Date(),
          new Date(activeCycle.roundStartDate)
        );
        if (timeDelta > secondsAmount) {
          if (!activeCycle.isInRest && activeCycle.rounds < roundsAmount) {
            markCurrentRoundAsFinished();
          } else if (
            activeCycle.isInRest &&
            activeCycle.rounds < roundsAmount
          ) {
            setStopRest();
          } else {
            markCurrentCycleAsFinished();
          }
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
    amountSecondsPassed,
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
