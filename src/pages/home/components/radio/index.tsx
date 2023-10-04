import { StrictMode, useContext, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { CyclesContext } from "../../../../context/cyclesContext";
import { RadioContainer } from "./styles";
import { DisplayTrack } from "./components/displayTrack";
import { Controls } from "./components/controls";
import { ProgressBar } from "./components/progressBar";
import { tracks } from "./tracks";
import { SettingsContext } from "../../../../context/settingsContext";

export function Radio() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const { activeCycle, shouldPlayAlarm } = useContext(CyclesContext);
  const [trackLocation, setTrackLocation] = useState<number>(0);
  const { activeSound } = useContext(SettingsContext);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef() as React.RefObject<HTMLAudioElement>;

  function handleLoadedMetaData() {
    setDuration(audioRef.current!.duration);
    if (trackLocation !== 0 && audioRef!.current?.currentTime === 0)
      audioRef.current!.currentTime = trackLocation;
  }

  function handleSkipTrack() {
    setTrackLocation(0);
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex((prevState) => prevState + 1);
    } else setCurrentTrackIndex(0);
  }

  function handleBackTrack() {
    setTrackLocation(0);
    if (currentTrackIndex >= 1) {
      setCurrentTrackIndex((prevState) => prevState - 1);
    } else {
      audioRef.current!.currentTime = 0;
    }
  }

  if (shouldPlayAlarm) return <audio src="/audios/alarm.mp3" autoPlay />;

  return (
    <>
      {activeCycle && activeSound && (
        <RadioContainer>
          <DisplayTrack
            audioRef={audioRef}
            currentTrack={tracks[currentTrackIndex]}
            handleLoadedMetaData={handleLoadedMetaData}
            handleSkipTrack={handleSkipTrack}
          />
          <Controls
            audioRef={audioRef}
            skipTrack={handleSkipTrack}
            backTrack={handleBackTrack}
            currentTrackIndex={currentTrackIndex}
            trackLocation={trackLocation}
            setTrackLocation={setTrackLocation}
          />
          <ProgressBar
            audioRef={audioRef}
            duration={duration}
            timeProgress={trackLocation}
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
