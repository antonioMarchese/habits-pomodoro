export enum actionTypes {
  CHANGE_WORK_DURATION = "CHANGE_WORK_DURATION",
  CHANGE_REST_DURATION = "CHANGE_REST_DURATION",
  CHANGE_ROUNDS_AMOUNT = "CHANGE_ROUNDS_AMOUNT",
  CHANGE_THEME = "CHANGE_THEME",
  TOGGLE_ACTIVE_SOUND = "TOGGLE_ACTIVE_SOUND",
  CHANGE_SOUND_VOLUME = "CHANGE_SOUND_VOLUME",
}

export function changeWorkDuration(workDuration: number) {
  return {
    type: actionTypes.CHANGE_WORK_DURATION,
    payload: {
      workDuration,
    },
  };
}

export function changeRestDuration(restDuration: number) {
  return {
    type: actionTypes.CHANGE_REST_DURATION,
    payload: {
      restDuration,
    },
  };
}

export function changeRoundsAmount(rounds: number) {
  return {
    type: actionTypes.CHANGE_ROUNDS_AMOUNT,
    payload: {
      rounds,
    },
  };
}

export function changeTheme() {
  return {
    type: actionTypes.CHANGE_THEME,
  };
}

export function toggleActiveSound() {
  return {
    type: actionTypes.TOGGLE_ACTIVE_SOUND,
  };
}

export function changeSoundVolume(soundVolume: number) {
  return {
    type: actionTypes.CHANGE_SOUND_VOLUME,
    payload: {
      soundVolume,
    },
  };
}
