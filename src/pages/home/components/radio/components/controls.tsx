import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  ButtonContainer,
  ControlContainer,
  StopPlayControlContainer,
} from "./styles";
import { Pause, Play, SkipBack, SkipForward } from "phosphor-react";
import { CyclesContext } from "../../../../../context/cyclesContext";
import VolumeController from "./volumeController";
import { SettingsContext } from "../../../../../context/settingsContext";

export function Controls({
  audioRef,
  skipTrack,
  backTrack,
  currentTrackIndex,
  trackLocation,
  setTrackLocation,
}: {
  audioRef: React.RefObject<HTMLAudioElement>;
  skipTrack: () => void;
  currentTrackIndex: number;
  trackLocation: number;
  backTrack: () => void;
  setTrackLocation: (value: number) => void;
}) {
  const { activeCycle } = useContext(CyclesContext);
  const [isPlaying, setIsPlaying] = useState(Boolean(activeCycle));
  const { soundVolume, setSoundVolume } = useContext(SettingsContext);

  const playAnimationRef = useRef<number>(0);

  function handleChangeVolume(volumeValue: number[]) {
    setSoundVolume(volumeValue[0]);
  }

  function handleTogglePlayPause() {
    setIsPlaying((prevState) => !prevState);
  }

  const repeat = useCallback(() => {
    if (audioRef.current) {
      const currentTime = audioRef.current!.currentTime;
      if (trackLocation !== 0 && currentTime === 0) {
        audioRef.current!.currentTime = trackLocation;
      } else setTrackLocation(currentTime);

      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, [trackLocation, setTrackLocation, currentTrackIndex]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current!.play();
    } else {
      audioRef.current!.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current!.volume = soundVolume / 100;
    }
  }, [soundVolume, audioRef]);

  return (
    <ControlContainer>
      <div className="volumeContainer">
        <VolumeController
          changeVolume={handleChangeVolume}
          volume={soundVolume}
        />
      </div>
      <ButtonContainer className="buttonContainer">
        <button className="back">
          <SkipBack onClick={backTrack} />
        </button>
        <StopPlayControlContainer>
          <button onClick={handleTogglePlayPause}>
            {isPlaying ? <Pause weight="fill" /> : <Play weight="fill" />}
          </button>
        </StopPlayControlContainer>
        <button className="skip">
          <SkipForward onClick={skipTrack} />
        </button>
      </ButtonContainer>
    </ControlContainer>
  );
}
