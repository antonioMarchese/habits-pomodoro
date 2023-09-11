import { useContext } from "react";

import {
  StartCountdownButton,
  StopCountdownButton,
  HomeContainer,
  Title,
} from "./styles";

import { HandPalm, Play } from "phosphor-react";
import { CountDown } from "./components/countdown";
import { NewCycleForm as Form } from "./components/newCycleForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as zod from "zod";
import { CyclesContext } from "../../context/cyclesContext";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe o nome do projeto"),
  timing: zod
    .number()
    // .min(5, "O ciclo precisa ter no mínimo 5 minutos.")
    .max(60, "O ciclo pode ter no máximo 60 minutos."),
});

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { createNewCycle, interruptCycle, activeCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      timing: 0,
    },
  });

  function handleCreateNewCycle(data: newCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch("task");

  const isFormValid = task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        {activeCycle ? (
          <Title>
            <p>
              <strong>Trabalhando em </strong>
              {activeCycle.task} <strong>por</strong>{" "}
              {activeCycle.minutesAmount} min.
            </p>
          </Title>
        ) : (
          <FormProvider {...newCycleForm}>
            <Form disabled={Boolean(activeCycle)} />
          </FormProvider>
        )}
        <CountDown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
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
