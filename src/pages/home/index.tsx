import { useContext, useState } from "react";

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
  TextArea,
  TextAreaContainer,
} from "./styles";

import { Clock, HandPalm, Pause, Play, Gear } from "phosphor-react";
import { CountDown } from "./components/countdown";
import { NewCycleForm as Form } from "./components/newCycleForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as zod from "zod";
import { CyclesContext } from "../../context/cyclesContext";
import { MAX_ROUNDS, SettingsContext } from "../../context/settingsContext";
import { BaseButton } from "../../components/button";

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
    handleEditCycle,
  } = useContext(CyclesContext);
  const { workDuration, restDuration, roundsAmount } =
    useContext(SettingsContext);
  const [description, setDescription] = useState(() => {
    return activeCycle ? activeCycle.description : "";
  });

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
    setDescription("");
    reset();
  }

  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch("task");

  const isFormValid = task;

  function handleChangeDescription() {
    const changedCycle = {
      ...activeCycle!,
      description,
    };
    handleEditCycle(changedCycle);
  }

  return (
    <HomeContainer>
      {activeCycle && (
        <RoundContainer>
          <RoundContainerHeader>
            <Clock size={24} />
            {activeCycle.rounds} /{" "}
            {roundsAmount === MAX_ROUNDS ? "♾️" : roundsAmount}
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
                <strong> {activeCycle.task} </strong>
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

      <TextAreaContainer animate={activeCycle ? "appear" : "hide"}>
        <TextArea
          placeholder="Sinta-se a vontade para descrever mais detalhadamente a tarefa que está realizando"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        />
        <BaseButton
          onClick={handleChangeDescription}
          disabled={!description || description === activeCycle?.description}
        >
          <Gear size={24} />
          Salvar
        </BaseButton>
      </TextAreaContainer>
    </HomeContainer>
  );
}
