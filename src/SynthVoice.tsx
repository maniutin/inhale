import * as Tone from "tone";
import { useState } from "react";

const synth = new Tone.MonoSynth({
  oscillator: { type: "sine" },
}).toDestination();

function SynthVoice() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const playSynth = () => {
    setIsPlaying(true);

    new Tone.Loop(() => {
      synth.triggerAttackRelease("C4", 1);
    }, 2).start();

    Tone.Transport.start();
    Tone.start();
  };

  const stopSynth = () => {
    setIsPlaying(false);
    Tone.Transport.cancel();
  };
  return (
    <button onClick={isPlaying ? stopSynth : playSynth}>
      {isPlaying ? "Stop" : "Play"}
    </button>
  );
}

export default SynthVoice;
