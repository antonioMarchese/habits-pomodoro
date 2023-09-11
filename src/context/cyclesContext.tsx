import React, { createContext, useEffect, useReducer, useState } from "react";
import { CyclesReducer } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  interrupCycle,
  markCycleFinished,
} from "../reducers/cycles/actions";

import { differenceInSeconds } from "date-fns";

interface CreateCycleProps {
  task: string;
  timing: number;
}

export interface CycleProps {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextProps {
  cycles: CycleProps[];
  activeCycle: CycleProps | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  shouldPlayAlarm: boolean;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (secondsToSet: number) => void;
  createNewCycle: (cycle: CreateCycleProps) => void;
  interruptCycle: () => void;
}

interface CyclesContextProviderProps {
  children: React.ReactNode; // Qualquer jsx/html válido
}

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
      const storageStateJSON = localStorage.getItem(
        "@habits-pomodoro:cycles-state-1.0.0"
      );

      return storageStateJSON ? JSON.parse(storageStateJSON) : initalState;
    }
  );
  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  const [shouldPlayAlarm, setShouldPlayAlarm] = useState(false);

  // Quando tiver um ciclo ativo não deve tocar

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }
    return 0;
  });

  function createNewCycle(data: CreateCycleProps) {
    const newCycle: CycleProps = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.timing,
      startDate: new Date(),
    };
    dispatch(addNewCycleAction(newCycle));
    setShouldPlayAlarm(false);
    setAmountSecondsPassed(0);
  }

  function interruptCycle() {
    dispatch(interrupCycle());
  }

  function markCurrentCycleAsFinished() {
    setShouldPlayAlarm(true);
    dispatch(markCycleFinished());
  }

  function setSecondsPassed(secondsToSet: number) {
    setAmountSecondsPassed(secondsToSet);
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@habits-pomodoro:cycles-state-1.0.0", stateJSON);
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
        setSecondsPassed,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
