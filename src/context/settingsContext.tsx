import { createContext, useReducer } from "react";
import { SettingsReducer } from "../reducers/settings/reducer";
import {
  changeRestDuration,
  changeRoundsAmount,
  changeSoundVolume,
  changeTheme,
  changeWorkDuration,
  toggleActiveSound,
} from "../reducers/settings/actions";

export interface SettingsProps {
  workDuration: number;
  restDuration: number;
  roundsAmount: number;
  theme: "dark" | "light";
  activeSound: boolean;
  soundVolume: number;
}

interface SettingsContextProviderProps {
  children: React.ReactNode; // Qualquer jsx/html válido
  theme: "dark" | "light";
  setTheme: (theme: any) => void;
}

interface SettingsContextProps {
  workDuration: number;
  restDuration: number;
  roundsAmount: number;
  theme: "dark" | "light";
  activeSound: boolean;
  soundVolume: number;
  setWorkDuration: (workDuration: number) => void;
  setRestDuration: (restDuration: number) => void;
  setRoundsAmount: (rounds: number) => void;
  changeCurrentTheme: () => void;
  changeActiveSound: () => void;
  setSoundVolume: (volume: number) => void;
  saveCurrentSettings: (settings: SettingsProps) => void;
}

const defaultSettings: SettingsProps = {
  workDuration: 45,
  restDuration: 15,
  roundsAmount: 3,
  activeSound: true,
  theme: "dark",
  soundVolume: 60,
};

export const localStorageKey = "@habits-pomodoro:settings-1.0.0";

export const SettingsContext = createContext({} as SettingsContextProps);

export function SettingsContextProvider({
  children,
  theme,
  setTheme,
}: SettingsContextProviderProps) {
  const [settingsState, dispatch] = useReducer(
    SettingsReducer,
    defaultSettings,
    (initialState) => {
      const storageSettingsJSON = localStorage.getItem(localStorageKey);

      return storageSettingsJSON
        ? (JSON.parse(storageSettingsJSON) as SettingsProps)
        : initialState;
    }
  );

  function setWorkDuration(value: number) {
    dispatch(changeWorkDuration(value));
  }

  function setRestDuration(value: number) {
    dispatch(changeRestDuration(value));
  }

  function setRoundsAmount(rounds: number) {
    dispatch(changeRoundsAmount(rounds));
  }

  function changeCurrentTheme() {
    dispatch(changeTheme());
    setTheme((prevState: "dark" | "light") =>
      prevState === "dark" ? "light" : "dark"
    );
  }

  function changeActiveSound() {
    dispatch(toggleActiveSound());
  }

  function setSoundVolume(volume: number) {
    dispatch(changeSoundVolume(volume));
  }

  function saveCurrentSettings() {
    const settings = {
      workDuration: settingsState.workDuration,
      restDuration: settingsState.restDuration,
      roundsAmount: settingsState.roundsAmount,
      theme,
      activeSound: settingsState.activeSound,
      soundVolume: settingsState.soundVolume ?? 60,
    };
    const settingsJSON = JSON.stringify(settings);

    localStorage.setItem(localStorageKey, settingsJSON);
  }

  return (
    <SettingsContext.Provider
      value={{
        workDuration: settingsState.workDuration,
        restDuration: settingsState.restDuration,
        activeSound: settingsState.activeSound,
        roundsAmount: settingsState.roundsAmount,
        theme: settingsState.theme,
        soundVolume: settingsState.soundVolume,
        setRestDuration,
        setWorkDuration,
        setRoundsAmount,
        changeActiveSound,
        changeCurrentTheme,
        setSoundVolume,
        saveCurrentSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
