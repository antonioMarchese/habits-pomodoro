import { useContext, useEffect, useState } from "react";
import { ControlContainer, StopPlayControlContainer } from "./styles";
import { Pause, Play, SkipBack, SkipForward } from "phosphor-react";
import { CyclesContext } from "../../../../../context/cyclesContext";

export function Controls({
  audioRef,
  skipTrack,
  backTrack,
}: {
  audioRef: React.RefObject<HTMLAudioElement>;
  skipTrack: () => void;
  backTrack: () => void;
}) {
  const { activeCycle } = useContext(CyclesContext);
  const [isPlaying, setIsPlaying] = useState(Boolean(activeCycle));

  function handleTogglePlayPause() {
    setIsPlaying((prevState) => !prevState);
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current!.play();
    } else {
      audioRef.current!.pause();
    }
  }, [isPlaying, audioRef]);

  return (
    <ControlContainer>
      <button>
        <SkipBack onClick={backTrack} />
      </button>
      <StopPlayControlContainer>
        <button onClick={handleTogglePlayPause}>
          {isPlaying ? <Pause weight="fill" /> : <Play weight="fill" />}
        </button>
      </StopPlayControlContainer>
      <button>
        <SkipForward onClick={skipTrack} />
      </button>
    </ControlContainer>
  );
}
