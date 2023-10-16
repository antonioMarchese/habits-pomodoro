import { useFormContext } from "react-hook-form";
import { FormContainer, TaskInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../../../../context/cyclesContext";

export function NewCycleForm({ disabled }: { disabled: boolean }) {
  const { register } = useFormContext();
  const { cycles } = useContext(CyclesContext);

  return (
    <FormContainer>
      <TaskInput
        type="text"
        id="task"
        placeholder="Começar jornada"
        list="task-sugestion"
        autoComplete="off"
        disabled={disabled}
        {...register("task")}
      />

      <datalist id="task-sugestion">
        {cycles.length > 0 &&
          Array.from(new Set(cycles.map((cycle) => cycle.task))).map(
            (cycle, i) => <option key={i} value={cycle} />
          )}
      </datalist>
    </FormContainer>
  );
}
