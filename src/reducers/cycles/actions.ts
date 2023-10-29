import { CycleProps } from "../../context/cyclesContext";

export enum actionTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  INTERRUPT_CYCLE = "INTERRUPT_CYCLE",
  PAUSE_CYCLE = "PAUSE_CYCLE",
  PLAY_CYCLE = "PLAY_CYCLE",
  MARK_CYCLE_AS_FINISHED = "MARK_CYCLE_AS_FINISHED",
  MARK_ROUND_AS_FINISHED = "MARK_ROUND_AS_FINISHED",
  MARK_REST_AS_FINISHED = "MARK_REST_AS_FINISHED",
  CLEAR_CYCLES = "CLEAR_CYCLES",
  SORT_CYCLES = "SORT_CYCLES",
}

export function addNewCycleAction(newCycle: CycleProps) {
  return {
    type: actionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
}

export function interrupCycle(settingsRounds: number) {
  return {
    type: actionTypes.INTERRUPT_CYCLE,
    payload: {
      settingsRounds,
    },
  };
}

export function pauseCycle(secondsPassed: number) {
  return {
    type: actionTypes.PAUSE_CYCLE,
    payload: {
      secondsPassed,
    },
  };
}

export function playCycle() {
  return {
    type: actionTypes.PLAY_CYCLE,
  };
}

export function markCycleFinished() {
  return {
    type: actionTypes.MARK_CYCLE_AS_FINISHED,
  };
}

export function markRundFinished() {
  return {
    type: actionTypes.MARK_ROUND_AS_FINISHED,
  };
}

export function stopRest() {
  return {
    type: actionTypes.MARK_REST_AS_FINISHED,
  };
}

export function clearCycles() {
  return {
    type: actionTypes.CLEAR_CYCLES,
  };
}

export function sortCycles() {
  return {
    type: actionTypes.SORT_CYCLES,
  };
}
