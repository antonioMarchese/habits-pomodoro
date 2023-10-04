import { Track } from "../tracks";
import { DisplayTrackContainer } from "./styles";

export function DisplayTrack({
  currentTrack,
  audioRef,
  handleLoadedMetaData,
  handleSkipTrack,
}: {
  currentTrack: Track;
  audioRef: React.RefObject<HTMLAudioElement>;
  handleLoadedMetaData: () => void;
  handleSkipTrack: () => void;
}) {
  return (
    <DisplayTrackContainer>
      <audio
        autoPlay
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={handleLoadedMetaData}
        onEnded={handleSkipTrack}
      />
      <h1>{currentTrack.title}</h1>
    </DisplayTrackContainer>
  );
}
