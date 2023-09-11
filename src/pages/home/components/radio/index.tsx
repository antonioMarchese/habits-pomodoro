import { StrictMode, useContext, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { CyclesContext } from "../../../../context/cyclesContext";
import { RadioContainer } from "./styles";
import { DisplayTrack } from "./components/displayTrack";
import { Controls } from "./components/controls";
import { ProgressBar } from "./components/progressBar";
import { tracks } from "./tracks";

export function Radio() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const { activeCycle, shouldPlayAlarm } = useContext(CyclesContext);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef() as React.RefObject<HTMLAudioElement>;

  function handleLoadedMetaData() {
    setDuration(audioRef.current!.duration);
  }

  function handleChangeTimeProgress() {
    if (audioRef.current) return setTimeProgress(audioRef.current!.currentTime);
  }

  function handleSkipTrack() {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex((prevState) => prevState + 1);
    } else setCurrentTrackIndex(0);
  }

  function handleBackTrack() {
    if (currentTrackIndex >= 1) {
      setCurrentTrackIndex((prevState) => prevState - 1);
    } else {
      audioRef.current!.currentTime = 0;
    }
  }

  useEffect(() => {
    handleChangeTimeProgress();

    if (audioRef.current?.currentTime === duration) {
      handleSkipTrack();
    }
  }, [audioRef.current?.currentTime]);

  if (shouldPlayAlarm) return <audio src="/audios/alarm.mp3" autoPlay />;

  return (
    <>
      {activeCycle && (
        <RadioContainer>
          <DisplayTrack
            audioRef={audioRef}
            currentTrack={tracks[currentTrackIndex]}
            handleLoadedMetaData={handleLoadedMetaData}
          />
          <Controls
            audioRef={audioRef}
            skipTrack={handleSkipTrack}
            backTrack={handleBackTrack}
          />
          <ProgressBar
            audioRef={audioRef}
            duration={duration}
            timeProgress={timeProgress}
          />
        </RadioContainer>
      )}
    </>
  );
}

export default function AudioPlayer() {
  return ReactDOM.createPortal(
    <StrictMode>
      <Radio />
    </StrictMode>,
    document.getElementById("audio-root") as HTMLElement
  );
}
