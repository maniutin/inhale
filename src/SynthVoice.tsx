import * as Tone from "tone";
import { useState } from "react";

const synth = new Tone.MonoSynth({
  oscillator: { type: "sine" },
}).toDestination();

function SynthVoice() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const playSynth = () => {
    setIsPlaying(true);

    synth.volume.value = 0;
    synth.triggerAttackRelease(261, 86400);

    Tone.Transport.start();
    Tone.start();
  };

  const stopSynth = () => {
    setIsPlaying(false);
    synth.volume.value = -100;
  };

  return (
    <div>
      <button onClick={isPlaying ? stopSynth : playSynth}>
        {isPlaying ? "stop" : "play"}
      </button>
      <div>
        <button onClick={() => (synth.oscillator.type = "sawtooth")}>
          saw
        </button>
        <button onClick={() => (synth.oscillator.type = "square")}>
          square
        </button>
        <button onClick={() => (synth.oscillator.type = "sine")}>sine</button>
      </div>
    </div>
  );
}

export default SynthVoice;
