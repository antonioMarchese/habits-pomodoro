import { CycleProps } from "../../context/cyclesContext";

export enum actionTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  INTERRUPT_CYCLE = "INTERRUPT_CYCLE",
  MARK_CYCLE_AS_FINISHED = "MARK_CYCLE_AS_FINISHED",
}

export function addNewCycleAction(newCycle: CycleProps) {
  return {
    type: actionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
}

export function interrupCycle() {
  return {
    type: actionTypes.INTERRUPT_CYCLE,
  };
}

export function markCycleFinished() {
  return {
    type: actionTypes.MARK_CYCLE_AS_FINISHED,
  };
}
