import { useContext, useEffect, useState } from "react";
import { SettingsContainer } from "./styles";
import { SettingsOption } from "./option";
import { BaseButton } from "../../components/button";
import {
  SettingsContext,
  SettingsProps,
  localStorageKey,
} from "../../context/settingsContext";
import { CyclesContext } from "../../context/cyclesContext";
import CreateToast from "../../utils/createToast";
import { SuccessSettingsSavedToast } from "../../utils/toasts";

const OPTIONS = [
  {
    title: "Tempo de trabalho",
    subtitle: "(em minutos)",
    range: 60,
  },
  {
    title: "Tempo de descanso",
    subtitle: "(em minutos)",
    range: 15,
  },
  {
    title: "Número de rounds",
    range: 6,
  },
];

export function Settings() {
  const {
    activeSound,
    restDuration,
    workDuration,
    roundsAmount,
    theme,
    soundVolume,
    setWorkDuration,
    setRestDuration,
    setRoundsAmount,
    changeActiveSound,
    changeCurrentTheme,
    saveCurrentSettings,
  } = useContext(SettingsContext);
  const { activeCycleId } = useContext(CyclesContext);
  const [currentSettings, setCurrentSettings] = useState<SettingsProps>(() => {
    const storageSettingsJSON = localStorage.getItem(localStorageKey);

    return storageSettingsJSON
      ? (JSON.parse(storageSettingsJSON) as SettingsProps)
      : {
          activeSound,
          restDuration,
          workDuration,
          roundsAmount,
          theme,
          soundVolume,
        };
  });

  const isButtonDisabled =
    activeSound === currentSettings.activeSound &&
    restDuration === currentSettings.restDuration &&
    workDuration === currentSettings.workDuration &&
    roundsAmount === currentSettings.roundsAmount &&
    theme === currentSettings.theme;

  function handleSetWorkDuration(currentWorkDurationValue: number) {
    setWorkDuration(currentWorkDurationValue);
  }

  function handleSetRestDuration(currentRestDurationValue: number) {
    setRestDuration(currentRestDurationValue);
  }

  function handleSetRoundsAmount(rounds: number) {
    setRoundsAmount(rounds);
  }

  function handleSaveSettings() {
    CreateToast(SuccessSettingsSavedToast);
    const settings = {
      workDuration,
      restDuration,
      activeSound,
      roundsAmount,
      theme,
      soundVolume,
    };
    saveCurrentSettings(settings);
    setCurrentSettings(settings);
  }

  useEffect(() => {
    document.title = "Configurações";

    return () => {
      document.title = "Habits Pomodoro";
    };
  }, []);

  return (
    <SettingsContainer>
      <h1>Configurações</h1>

      <hr />

      <SettingsOption.Root>
        <SettingsOption.Title
          title={OPTIONS[0].title}
          subtitle={OPTIONS[0].subtitle}
        />
        <SettingsOption.Slider
          range={OPTIONS[0].range}
          optionValue={workDuration}
          setValue={handleSetWorkDuration}
          disabled={Boolean(activeCycleId)}
          min={15}
          step={5}
        />
      </SettingsOption.Root>

      <SettingsOption.Root>
        <SettingsOption.Title
          title={OPTIONS[1].title}
          subtitle={OPTIONS[1].subtitle}
        />
        <SettingsOption.Slider
          range={OPTIONS[1].range}
          optionValue={restDuration}
          setValue={handleSetRestDuration}
          min={5}
          step={5}
          disabled={Boolean(activeCycleId)}
        />
      </SettingsOption.Root>

      <SettingsOption.Root>
        <SettingsOption.Title title={OPTIONS[2].title} />
        <SettingsOption.Slider
          range={OPTIONS[2].range}
          optionValue={roundsAmount}
          maxValue={roundsAmount === OPTIONS[2].range ? "♾️" : undefined}
          setValue={handleSetRoundsAmount}
          min={1}
          step={1}
          disabled={Boolean(activeCycleId)}
        />
      </SettingsOption.Root>

      <hr />

      <SettingsOption.Root>
        <SettingsOption.Title title="Tema" />
        <SettingsOption.Switch
          setValue={changeCurrentTheme}
          checked={theme === "dark"}
        />
      </SettingsOption.Root>

      <SettingsOption.Root>
        <SettingsOption.Title title="Música" />
        <SettingsOption.Switch
          setValue={changeActiveSound}
          checked={activeSound}
          variant="success"
        />
      </SettingsOption.Root>

      <BaseButton
        type="button"
        onClick={handleSaveSettings}
        disabled={isButtonDisabled}
      >
        Salvar alterações permanentemente
      </BaseButton>
    </SettingsContainer>
  );
}
