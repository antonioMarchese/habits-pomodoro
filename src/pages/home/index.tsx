import { useContext } from "react";

import {
  StartCountdownButton,
  StopCountdownButton,
  HomeContainer,
  Title,
  ButtonContainer,
  RoundContainer,
  RoundSliderRoot,
  RoundSliderTrack,
  RoundSliderRange,
  RoundContainerHeader,
} from "./styles";

import { Clock, HandPalm, Pause, Play } from "phosphor-react";
import { CountDown } from "./components/countdown";
import { NewCycleForm as Form } from "./components/newCycleForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as zod from "zod";
import { CyclesContext } from "../../context/cyclesContext";
import { SettingsContext } from "../../context/settingsContext";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe o nome do projeto"),
});

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const {
    createNewCycle,
    interruptCycle,
    activeCycle,
    pauseCurrentCycle,
    continueCycle,
    amountSecondsPassed,
  } = useContext(CyclesContext);
  const { workDuration, restDuration, roundsAmount } =
    useContext(SettingsContext);

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
    },
  });

  function handleCreateNewCycle({ task }: newCycleFormData) {
    const data = {
      task,
      workDuration,
      restDuration,
    };
    createNewCycle(data);
    reset();
  }

  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch("task");

  const isFormValid = task;

  return (
    <HomeContainer>
      {activeCycle && (
        <RoundContainer>
          <RoundContainerHeader>
            <Clock size={24} />
            {activeCycle.rounds} / {roundsAmount}
          </RoundContainerHeader>
          <RoundSliderRoot
            defaultValue={[0]}
            min={0}
            max={1}
            value={
              activeCycle.isInRest
                ? [amountSecondsPassed / (60 * activeCycle.restMinutesAmount)]
                : [amountSecondsPassed / (60 * activeCycle.minutesAmount)]
            }
          >
            <RoundSliderTrack>
              <RoundSliderRange />
            </RoundSliderTrack>
          </RoundSliderRoot>
        </RoundContainer>
      )}
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        {activeCycle ? (
          activeCycle.isInRest ? (
            <Title>
              <p>Aproveite o seu tempo de descanso para fazer um alongamento</p>
            </Title>
          ) : (
            <Title>
              <p>
                Trabalhando em
                <strong> {activeCycle.task} </strong> por{" "}
                <strong>{activeCycle.minutesAmount}</strong> min.
              </p>
            </Title>
          )
        ) : (
          <FormProvider {...newCycleForm}>
            <Form disabled={Boolean(activeCycle)} />
          </FormProvider>
        )}
        <CountDown />

        {activeCycle ? (
          activeCycle.isPaused ? (
            <ButtonContainer>
              <StartCountdownButton type="button" onClick={continueCycle}>
                <Play size={24} />
                Continuar
              </StartCountdownButton>
              <StopCountdownButton type="button" onClick={interruptCycle}>
                <HandPalm size={24} />
                Interromper
              </StopCountdownButton>
            </ButtonContainer>
          ) : (
            <StopCountdownButton type="button" onClick={pauseCurrentCycle}>
              <Pause size={24} />
              Pausar
            </StopCountdownButton>
          )
        ) : (
          <StartCountdownButton disabled={!isFormValid} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
