import * as Tone from "tone";
import { useState } from "react";

import * as constants from "../../constants";
import * as utils from "../../utils";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import "./SynthVoice.scss";

function SynthVoice() {
  const { synth } = constants;

  const { handleFrequencyChange, handleParameterChange, handleWaveformChange } =
    utils;

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<number>(261);
  const [harmonicity, setHarmonicity] = useState<number>(1);

  synth.harmonicity.value = harmonicity;

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
        <button onClick={() => handleWaveformChange("sawtooth", 0, synth)}>
          saw
        </button>
        <button onClick={() => handleWaveformChange("square", 0, synth)}>
          square
        </button>
        <button onClick={() => handleWaveformChange("sine", 0, synth)}>
          sine
        </button>
      </div>
      <div className="waveform-voice1">
        <p>Osc 2 Waveform</p>
        <button onClick={() => handleWaveformChange("sawtooth", 1, synth)}>
          saw
        </button>
        <button onClick={() => handleWaveformChange("square", 1, synth)}>
          square
        </button>
        <button onClick={() => handleWaveformChange("sine", 1, synth)}>
          sine
        </button>
      </div>

      <div className="slider frequency-slider">
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
            onChange={(event, newValue) =>
              handleFrequencyChange(event, newValue, synth, setFrequency)
            }
          />
        </Box>
      </div>
      <div className="slider harmonicity-slider">
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
            onChange={(event, newValue) =>
              handleParameterChange(
                event,
                newValue,
                setHarmonicity,
                harmonicity
              )
            }
          />
        </Box>
      </div>
    </>
  );
}

export default SynthVoice;
