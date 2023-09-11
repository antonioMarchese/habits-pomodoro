import { useFormContext } from "react-hook-form";
import { FormContainer, MinutesInput, TaskInput } from "./styles";

export function NewCycleForm({ disabled }: { disabled: boolean }) {
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        placeholder="Nomeie o seu projeto"
        list="task-sugestion"
        autoComplete="off"
        disabled={disabled}
        {...register("task")}
      />

      <datalist id="task-sugestion">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>

      <label htmlFor="timing">durante</label>
      <MinutesInput
        type="number"
        id="timing"
        placeholder="00"
        max={60}
        disabled={disabled}
        {...register("timing", { valueAsNumber: true })}
      />

      <span>minutos</span>
    </FormContainer>
  );
}
