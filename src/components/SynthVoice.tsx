import * as Tone from "tone";
import { useState } from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import "./SynthVoice.scss";
import { Frequency } from "tone/build/esm/core/type/Units";

var vol = new Tone.Volume(-6);

const filter = new Tone.Filter({
  type: "lowpass",
  frequency: 10000,
  rolloff: -24,
}).toDestination();

const synth = new Tone.DuoSynth({
  vibratoAmount: 0,
  harmonicity: 1,
  voice0: { oscillator: { type: "sine" } },
  voice1: { oscillator: { type: "sine" } },
}).chain(vol, filter);

function SynthVoice() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<number>(261);
  const [cutoff, setCutoff] = useState<number>(10000);
  const [harmonicity, setHarmonicity] = useState<number>(1);
  const [volume, setVolume] = useState<number>(-6);

  const handleVolumeChange = (event: Event, newValue: any) => {
    setVolume(newValue as number);
    vol.volume.value = newValue;
  };

  const handleFrequencyChange = (event: Event, newValue: any) => {
    setFrequency(newValue as number);
    synth.setNote(newValue as Frequency);
  };

  const handleCutoffChange = (event: Event, newValue: any) => {
    setCutoff(newValue as number);
    filter.frequency.value = newValue;
  };

  const handleHarmonicityChange = (event: Event, newValue: any) => {
    setHarmonicity(newValue as number);
    synth.harmonicity.value = newValue;
  };

  const handleWaveformChange = (value: OscillatorType, voice: number) => {
    switch (voice) {
      case 0:
        synth.voice0.oscillator.type = value;
        break;
      case 1:
        synth.voice1.oscillator.type = value;
        break;
    }
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
      <div className="waveform-voice0">
        <p>Osc 1 Waveform</p>
        <button onClick={() => handleWaveformChange("sawtooth", 0)}>saw</button>
        <button onClick={() => handleWaveformChange("square", 0)}>
          square
        </button>
        <button onClick={() => handleWaveformChange("sine", 0)}>sine</button>
      </div>
      <div className="waveform-voice1">
        <p>Osc 2 Waveform</p>
        <button onClick={() => handleWaveformChange("sawtooth", 1)}>saw</button>
        <button onClick={() => handleWaveformChange("square", 1)}>
          square
        </button>
        <button onClick={() => handleWaveformChange("sine", 1)}>sine</button>
      </div>
      <div className="volume-slider">
        <Box sx={{ height: 200 }}>
          <Typography id="volume-slider" gutterBottom>
            Volume
          </Typography>
          <Slider
            aria-label="Volume"
            value={volume}
            defaultValue={volume}
            min={-36}
            max={0}
            orientation="vertical"
            valueLabelDisplay="auto"
            onChange={handleVolumeChange}
          />
        </Box>
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
      <div className="harmonicity-slider">
        <Box sx={{ width: 500 }}>
          <Typography id="harmonicity-slider" gutterBottom>
            Harmonicity
          </Typography>
          <Slider
            aria-label="Harmonicity"
            value={harmonicity}
            defaultValue={harmonicity}
            min={1}
            max={2}
            step={0.01}
            valueLabelDisplay="auto"
            onChange={handleHarmonicityChange}
          />
        </Box>
      </div>
    </>
  );
}

export default SynthVoice;
