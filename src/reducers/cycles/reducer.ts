import { produce } from "immer";

import { CycleProps } from "../../context/cyclesContext";
import { actionTypes } from "./actions";

interface CyclesState {
  cycles: CycleProps[];
  activeCycleId: string | null;
}

export function CyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case actionTypes.ADD_NEW_CYCLE:
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id,
      // };
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });
    case actionTypes.INTERRUPT_CYCLE: //   cycles: state.cycles.map((cycle) => //   ...state, // return {
    //     cycle.id === state.activeCycleId
    //       ? {
    //           ...cycle,
    //           interruptedDate: new Date(),
    //         }
    //       : cycle
    //   ),
    //   activeCycleId: null,
    // };
    {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentCycleIndex < 0) return state;

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].interruptedDate = new Date();
      });
    }
    case actionTypes.MARK_CYCLE_AS_FINISHED: // return {
    //   ...state,
    //   cycles: state.cycles.map((cycle) =>
    //     cycle.id === state.activeCycleId
    //       ? {
    //           ...cycle,
    //           finishedDate: new Date(),
    //         }
    //       : cycle
    //   ),
    //   activeCycleId: null,
    // };
    {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentCycleIndex < 0) return state;

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].finishedDate = new Date();
      });
    }

    default:
      return state;
  }
}
