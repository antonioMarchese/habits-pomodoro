import {
  SliderContainer,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from "../styles";

interface SliderOptionsProps {
  range: number;
  optionValue: number;
  maxValue?: string;
  setValue: (value: number) => void;
  min?: number;
  disabled?: boolean;
  step?: number;
}

export default function OptionSlider({
  range,
  optionValue,
  setValue,
  min,
  disabled,
  step = 5,
  maxValue,
}: SliderOptionsProps) {
  return (
    <SliderContainer>
      <p>{maxValue ?? optionValue}</p>
      <SliderRoot
        defaultValue={[optionValue]}
        max={range}
        step={step}
        onValueChange={(value) => setValue(value[0])}
        value={[optionValue]}
        min={min ?? 0}
        disabled={disabled}
      >
        <SliderTrack>
          <SliderRange $sixty={optionValue >= 0.6 * range} />
        </SliderTrack>
        <SliderThumb aria-label="range" aria-disabled={disabled} />
      </SliderRoot>
    </SliderContainer>
  );
}
