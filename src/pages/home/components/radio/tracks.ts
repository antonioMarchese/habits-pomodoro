import samurai from "/audios/bgmusic1.mp3";
import chinese from "/audios/bgmusic2.mp3";
import tai from "/audios/bgmusic3.mp3";
import short from "/audios/bgmusic4.mp3";
import lofi from "/audios/lofi.mp3";
import meditation from "/audios/meditation.mp3";
import rainMeditation from "/audios/rain-meditation.mp3";

export interface Track {
  title: string;
  src: string;
}

export const tracks: Track[] = [
  {
    title: "Sound frequencies for uplifting the spirit.",
    src: samurai,
  },
  {
    title: "It may takes long, but you'll get there!",
    src: chinese,
  },
  {
    title: "Keep trying! Push harder! But always easy.",
    src: tai,
  },
  {
    title: "412Hz",
    src: short,
  },
  {
    title: "Lo-Fi",
    src: lofi,
  },
  {
    title: "Meditation",
    src: meditation,
  },
  {
    title: "Rain Meditation",
    src: rainMeditation,
  },
];
