import { Track } from "../tracks";
import { DisplayTrackContainer } from "./styles";

export function DisplayTrack({
  currentTrack,
  audioRef,
  handleLoadedMetaData,
}: {
  currentTrack: Track;
  audioRef: React.RefObject<HTMLAudioElement>;
  handleLoadedMetaData: () => void;
}) {
  return (
    <DisplayTrackContainer>
      <audio
        autoPlay
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={handleLoadedMetaData}
      />
      <h1>{currentTrack.title}</h1>
    </DisplayTrackContainer>
  );
}
