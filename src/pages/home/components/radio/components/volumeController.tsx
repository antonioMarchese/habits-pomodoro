import {
  VolumeTrackerRoot,
  VolumeSliderRange,
  VolumeSliderThumb,
  VolumeSliderTrack,
  VolumeContainer,
} from "./styles";

import { SpeakerHigh } from "phosphor-react";

export default function VolumeController({
  volume,
  changeVolume,
}: {
  volume: number;
  changeVolume: (value: number[]) => void;
}) {
  return (
    <VolumeContainer>
      <SpeakerHigh size={24} />
      <VolumeTrackerRoot
        onValueChange={changeVolume}
        defaultValue={[0]}
        max={100}
        step={1}
        value={[volume]}
      >
        <VolumeSliderTrack>
          <VolumeSliderRange />
        </VolumeSliderTrack>
        <VolumeSliderThumb />
      </VolumeTrackerRoot>
    </VolumeContainer>
  );
}
