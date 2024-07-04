import * as Tone from "tone";
import { useState } from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import "./SynthVoice.scss";

const synth = new Tone.MonoSynth({
  oscillator: { type: "sine" },
}).toDestination();

function SynthVoice() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<number>(261);

  const handleFrequencyChange = (event: Event, newValue: number | number[]) => {
    setFrequency(newValue as number);
    synth.setNote(frequency);
  };

  const playSynth = () => {
    setIsPlaying(true);

    Tone.Destination.mute = false;
    synth.triggerAttackRelease(frequency, 86400, 0, 0.5);

    Tone.Transport.start();
    Tone.start();
  };

  const stopSynth = () => {
    setIsPlaying(false);
    Tone.Destination.mute = true;
  };

  return (
    <>
      <button onClick={isPlaying ? stopSynth : playSynth}>
        {isPlaying ? "stop" : "play"}
      </button>
      <div className="waveform">
        <button onClick={() => (synth.oscillator.type = "sawtooth")}>
          saw
        </button>
        <button onClick={() => (synth.oscillator.type = "square")}>
          square
        </button>
        <button onClick={() => (synth.oscillator.type = "sine")}>sine</button>
      </div>
      <div className="frequency-slider">
        <Box sx={{ width: 500 }}>
          <Slider
            aria-label="Oscillator Freuqency"
            value={frequency}
            defaultValue={frequency}
            min={20}
            max={1000}
            valueLabelDisplay="auto"
            onChange={handleFrequencyChange}
          />
        </Box>
      </div>
    </>
  );
}

export default SynthVoice;
