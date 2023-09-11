import FormatMinutesAndSeconds from "../../../../../utils/formatMinutesAndSeconds";
import {
  SliderRoot,
  ProgressBarContainer,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "./styles";

interface ProgressBarProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  timeProgress: number;
  duration: number;
}

export function ProgressBar({
  audioRef,
  duration,
  timeProgress,
}: ProgressBarProps) {
  function handleProgressChange(progressValue: number[]) {
    audioRef.current!.currentTime = progressValue[0];
  }
  const [minutesAmount, secondsAmount] = FormatMinutesAndSeconds(duration);

  const [minutesPassed, secondsPassed] = FormatMinutesAndSeconds(timeProgress);

  return (
    <ProgressBarContainer>
      <span className="time current">
        {minutesPassed}:{secondsPassed}
      </span>
      <SliderRoot
        onValueChange={handleProgressChange}
        defaultValue={[0]}
        max={duration}
        step={1}
        value={[timeProgress]}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb aria-label="timing" />
      </SliderRoot>
      <span className="time">
        {minutesAmount}:{secondsAmount}
      </span>
    </ProgressBarContainer>
  );
}
