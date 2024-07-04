import * as Tone from "tone";
import { useState } from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import "./SynthVoice.scss";

const filter = new Tone.Filter(10000, "lowpass").toDestination();

const synth = new Tone.MonoSynth({
  oscillator: { type: "sine" },
}).connect(filter);

function SynthVoice() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<number>(261);
  const [cutoff, setCutoff] = useState<number>(10000);

  const handleFrequencyChange = (event: Event, newValue: number | number[]) => {
    setFrequency(newValue as number);
    synth.setNote(frequency);
  };
  const handleCutoffChange = (event: Event, newValue: any) => {
    setCutoff(newValue as number);
    filter.frequency.value = newValue;
  };

  const handleWaveformChange = (value: OscillatorType) => {
    synth.oscillator.type = value;
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
        <button onClick={() => handleWaveformChange("sawtooth")}>saw</button>
        <button onClick={() => handleWaveformChange("square")}>square</button>
        <button onClick={() => handleWaveformChange("sine")}>sine</button>
      </div>
      <div className="frequency-slider">
        <Box sx={{ width: 500 }}>
          <Typography id="frequency-slider" gutterBottom>
            Frequency
          </Typography>
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
      <div className="cutoff-slider">
        <Box sx={{ width: 500 }}>
          <Typography id="cutoff-slider" gutterBottom>
            Cutoff
          </Typography>
          <Slider
            aria-label="Filter Cutoff"
            value={cutoff}
            defaultValue={cutoff}
            min={20}
            max={10000}
            valueLabelDisplay="auto"
            onChange={handleCutoffChange}
          />
        </Box>
      </div>
    </>
  );
}

export default SynthVoice;
