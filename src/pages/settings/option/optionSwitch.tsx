import { SliderContainer, SwitchRoot, SwitchThumb } from "../styles";

export default function OptionSwitch({
  checked,
  setValue,
  variant,
}: {
  checked: boolean;
  setValue: () => void;
  variant?: "success" | "default";
}) {
  return (
    <SliderContainer>
      <SwitchRoot variant={variant} onClick={setValue} checked={checked}>
        <SwitchThumb />
      </SwitchRoot>
    </SliderContainer>
  );
}
