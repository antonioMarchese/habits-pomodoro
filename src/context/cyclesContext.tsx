import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { CyclesReducer } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  clearCycles,
  interrupCycle,
  markCycleFinished,
  markRundFinished,
  pauseCycle,
  playCycle,
  sortCycles,
  stopRest,
} from "../reducers/cycles/actions";

import { differenceInSeconds } from "date-fns";
import CreateToast from "../utils/createToast";
import {
  SuccessCycleFinishedToast,
  SuccessCyclesCleanedToast,
  SuccessRoundFinishedToast,
} from "../utils/toasts";
import { SettingsContext } from "./settingsContext";

interface CreateCycleProps {
  task: string;
  workDuration: number;
  restDuration: number;
}

export interface CycleProps {
  id: string;
  task: string;
  rounds: number;
  minutesAmount: number;
  restMinutesAmount: number;
  startDate: Date;
  roundStartDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
  isPaused?: boolean;
  isInRest?: boolean;
  amountSecondsPassedBeforePause?: number;
}

interface CyclesContextProps {
  cycles: CycleProps[];
  activeCycle: CycleProps | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  shouldPlayAlarm: boolean;
  markCurrentCycleAsFinished: () => void;
  markCurrentRoundAsFinished: () => void;
  setStopRest: () => void;
  setSecondsPassed: (secondsToSet: number) => void;
  createNewCycle: (cycle: CreateCycleProps) => void;
  interruptCycle: () => void;
  pauseCurrentCycle: () => void;
  continueCycle: () => void;
  clearCyclesHistory: () => void;
  handleSortCycles: () => void;
}

interface CyclesContextProviderProps {
  children: React.ReactNode; // Qualquer jsx/html válido
}

const cyclesLocalStorageKey = "@habits-pomodoro:cycles-state-1.0.0";

export const CyclesContext = createContext({} as CyclesContextProps);

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  // setCycles -> dispatch -> vira um método para disparar a action
  const [cyclesState, dispatch] = useReducer(
    CyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initalState) => {
      const storageStateJSON = localStorage.getItem(cyclesLocalStorageKey);

      return storageStateJSON ? JSON.parse(storageStateJSON) : initalState;
    }
  );
  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  const [shouldPlayAlarm, setShouldPlayAlarm] = useState(false);
  const { roundsAmount } = useContext(SettingsContext);

  // Quando tiver um ciclo ativo não deve tocar

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(
        new Date(),
        new Date(activeCycle.roundStartDate)
      );
    }
    return 0;
  });

  function createNewCycle(data: CreateCycleProps) {
    const newCycle: CycleProps = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.workDuration,
      restMinutesAmount: data.restDuration,
      startDate: new Date(),
      roundStartDate: new Date(),
      rounds: 0,
      isPaused: false,
    };
    dispatch(addNewCycleAction(newCycle));
    setShouldPlayAlarm(false);
    setAmountSecondsPassed(0);
  }

  function interruptCycle() {
    dispatch(interrupCycle(roundsAmount));
  }

  function pauseCurrentCycle() {
    dispatch(pauseCycle(amountSecondsPassed));
  }

  function continueCycle() {
    dispatch(playCycle());
  }

  function clearCyclesHistory() {
    CreateToast(SuccessCyclesCleanedToast);
    dispatch(clearCycles());
    localStorage.removeItem(cyclesLocalStorageKey);
  }

  function markCurrentCycleAsFinished() {
    CreateToast(SuccessCycleFinishedToast);
    setShouldPlayAlarm(true);
    dispatch(markCycleFinished());
    setTimeout(() => {
      setShouldPlayAlarm(false);
    }, 8000);
  }

  function setStopRest() {
    setShouldPlayAlarm(true);
    dispatch(stopRest());
    setTimeout(() => {
      setShouldPlayAlarm(false);
    }, 8000);
  }

  function markCurrentRoundAsFinished() {
    CreateToast(SuccessRoundFinishedToast);
    setShouldPlayAlarm(true);
    dispatch(markRundFinished());
    setTimeout(() => {
      setShouldPlayAlarm(false);
    }, 8000);
  }

  function setSecondsPassed(secondsToSet: number) {
    setAmountSecondsPassed(secondsToSet);
  }

  function handleSortCycles() {
    dispatch(sortCycles());
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem(cyclesLocalStorageKey, stateJSON);
  }, [cyclesState]);

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        shouldPlayAlarm,
        markCurrentCycleAsFinished,
        markCurrentRoundAsFinished,
        setStopRest,
        setSecondsPassed,
        createNewCycle,
        interruptCycle,
        pauseCurrentCycle,
        continueCycle,
        clearCyclesHistory,
        handleSortCycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
