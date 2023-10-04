import { produce } from "immer";

import { SettingsProps } from "../../context/settingsContext";
import { actionTypes } from "./actions";

export function SettingsReducer(state: SettingsProps, action: any) {
  switch (action.type) {
    case actionTypes.CHANGE_WORK_DURATION:
      return produce(state, (draft) => {
        draft.workDuration = action.payload.workDuration;
      });

    case actionTypes.CHANGE_REST_DURATION:
      return produce(state, (draft) => {
        draft.restDuration = action.payload.restDuration;
      });

    case actionTypes.CHANGE_ROUNDS_AMOUNT:
      return produce(state, (draft) => {
        draft.roundsAmount = action.payload.rounds;
      });

    case actionTypes.CHANGE_THEME:
      return produce(state, (draft) => {
        draft.theme = draft.theme === "dark" ? "light" : "dark";
      });

    case actionTypes.TOGGLE_ACTIVE_SOUND:
      return produce(state, (draft) => {
        draft.activeSound = !draft.activeSound;
      });

    case actionTypes.CHANGE_SOUND_VOLUME:
      return produce(state, (draft) => {
        draft.soundVolume = action.payload.soundVolume;
      });

    default:
      return state;
  }
}
