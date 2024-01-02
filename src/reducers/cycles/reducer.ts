import { produce } from "immer";

import { CycleProps } from "../../context/cyclesContext";
import { actionTypes } from "./actions";

import sub from "date-fns/sub";
import { isBefore } from "date-fns";
import { MAX_ROUNDS } from "../../context/settingsContext";

interface CyclesState {
  cycles: CycleProps[];
  activeCycleId: string | null;
}

export function CyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case actionTypes.ADD_NEW_CYCLE:
      let isCyclesSorted = false;
      if (state.cycles.length > 1) {
        isCyclesSorted = isBefore(
          new Date(state.cycles[state.cycles.length - 1].startDate),
          new Date(state.cycles[0].startDate)
        );
      }
      return produce(state, (draft) => {
        if (isCyclesSorted) {
          draft.cycles.unshift(action.payload.newCycle);
        } else {
          draft.cycles.push(action.payload.newCycle);
        }
        draft.activeCycleId = action.payload.newCycle.id;
      });

    case actionTypes.EDIT_CYCLE:
      return produce(state, (draft) => {
        draft.cycles = [
          ...draft.cycles.filter(
            (draftCycle) => draftCycle.id !== action.payload.cycle.id
          ),
          action.payload.cycle,
        ];
      });

    case actionTypes.INTERRUPT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentCycleIndex < 0) return state;

      return produce(state, (draft) => {
        if (
          action.payload.settingsRounds ===
            draft.cycles[currentCycleIndex].rounds ||
          action.payload.settingsRounds === MAX_ROUNDS
        ) {
          draft.cycles[currentCycleIndex].finishedDate = new Date();
        } else {
          draft.cycles[currentCycleIndex].interruptedDate = new Date();
        }
        draft.activeCycleId = null;
        if (draft.cycles[currentCycleIndex].isInRest) {
          draft.cycles[currentCycleIndex].amountSecondsPassedBeforePause = 0;
        }
      });
    }

    case actionTypes.PAUSE_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentCycleIndex < 0) return state;

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].isPaused = true;
        draft.cycles[currentCycleIndex].amountSecondsPassedBeforePause =
          action.payload.secondsPassed;
      });
    }

    case actionTypes.PLAY_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentCycleIndex < 0) return state;

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].isPaused = false;
        draft.cycles[currentCycleIndex].roundStartDate = sub(new Date(), {
          seconds:
            draft.cycles[currentCycleIndex].amountSecondsPassedBeforePause!,
        });
        draft.cycles[currentCycleIndex].amountSecondsPassedBeforePause = 0;
      });
    }

    case actionTypes.MARK_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentCycleIndex < 0) return state;

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].finishedDate = new Date();
      });
    }

    case actionTypes.MARK_REST_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentCycleIndex < 0) return state;

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].isInRest = false;
        draft.cycles[currentCycleIndex].roundStartDate = new Date();
      });
    }

    case actionTypes.MARK_ROUND_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentCycleIndex < 0) return state;

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].isInRest = true;
        draft.cycles[currentCycleIndex].roundStartDate = new Date();
        draft.cycles[currentCycleIndex].rounds++;
      });
    }

    case actionTypes.SORT_CYCLES: {
      if (state.cycles.length > 1) {
        const isCyclesSorted = isBefore(
          new Date(state.cycles[state.cycles.length - 1].startDate),
          new Date(state.cycles[0].startDate)
        );

        return produce(state, (draft) => {
          draft.cycles = isCyclesSorted
            ? draft.cycles.sort((a, b) =>
                isBefore(new Date(a.startDate), new Date(b.startDate)) ? -1 : 1
              )
            : draft.cycles.sort((a, b) =>
                isBefore(new Date(a.startDate), new Date(b.startDate)) ? 1 : -1
              );
        });
      }
      return state;
    }

    case actionTypes.CLEAR_CYCLES: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentCycleIndex < 0)
        return produce(state, (draft) => {
          draft.cycles = [];
        });

      return produce(state, (draft) => {
        const currentCycle = draft.cycles[currentCycleIndex];
        draft.cycles = [currentCycle];
      });
    }

    default:
      return state;
  }
}
