import { Frequency } from "tone/build/esm/core/type/Units";

export const handleFrequencyChange = (
  event: Event,
  newValue: any,
  synth: any,
  setFrequency: any
) => {
  setFrequency(newValue as number);
  synth.setNote(newValue as Frequency);
};

export const handleParameterChange = (
  event: Event,
  newValue: any,
  setValue: any,
  parameter: any
) => {
  setValue(newValue as number);
  parameter = newValue;
};

export const handleVolumeChange = (
  event: Event,
  newValue: any,
  vol: any,
  setVolume: any
) => {
  setVolume(newValue as number);
  vol.volume.value = newValue;
  if (newValue === -36) vol.mute = true;
};

export const handleWaveformChange = (
  value: OscillatorType,
  voice: number,
  synth: any
) => {
  switch (voice) {
    case 0:
      synth.voice0.oscillator.type = value;
      break;
    case 1:
      synth.voice1.oscillator.type = value;
      break;
  }
};
