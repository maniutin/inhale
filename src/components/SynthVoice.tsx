import * as Tone from "tone";
import { useState } from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import "./SynthVoice.scss";
import { Frequency } from "tone/build/esm/core/type/Units";

const vol = new Tone.PanVol(0, -6);

const reverb = new Tone.Reverb({ decay: 1.5, wet: 0 }).toDestination();

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
}).chain(vol, filter, reverb);

function SynthVoice() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<number>(261);
  const [cutoff, setCutoff] = useState<number>(10000);
  const [harmonicity, setHarmonicity] = useState<number>(1);
  const [volume, setVolume] = useState<number>(-6);
  const [reverbAmount, setReverbAmount] = useState<number>(0);
  const [reverbDecay, setReverbDecay] = useState<number>(1.5);

  const handleVolumeChange = (event: Event, newValue: any) => {
    setVolume(newValue as number);
    vol.volume.value = newValue;
    if (newValue === -36) vol.mute = true;
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

  const handleReverbAmountChange = (event: Event, newValue: any) => {
    setReverbAmount(newValue as number);
    reverb.wet.value = newValue;
  };

  const handleReverbDecayChange = (event: Event, newValue: any) => {
    setReverbDecay(newValue as number);
    reverb.decay = newValue;
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
      <div className="reverb-amount-slider">
        <Box sx={{ width: 500 }}>
          <Typography id="reverb-amount-slider" gutterBottom>
            Reverb Amount
          </Typography>
          <Slider
            aria-label="Reverb Amount"
            value={reverbAmount}
            defaultValue={reverbAmount}
            min={0}
            max={1}
            step={0.01}
            valueLabelDisplay="auto"
            onChange={handleReverbAmountChange}
          />
        </Box>
      </div>
      <div className="reverb-decay-slider">
        <Box sx={{ width: 500 }}>
          <Typography id="reverb-decay-slider" gutterBottom>
            Reverb Decay
          </Typography>
          <Slider
            aria-label="Reverb Decay"
            value={reverbDecay}
            defaultValue={reverbDecay}
            min={1}
            max={60}
            valueLabelDisplay="auto"
            onChange={handleReverbDecayChange}
          />
        </Box>
      </div>
    </>
  );
}

export default SynthVoice;
