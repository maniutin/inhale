import * as Tone from "tone";

export const filter = new Tone.Filter({
  type: "lowpass",
  frequency: 10000,
  rolloff: -24,
}).toDestination();

const limiter = new Tone.Limiter(-6);

export const reverb = new Tone.Reverb({ decay: 1.5, wet: 0 }).toDestination();

export const vol = new Tone.PanVol(0, -6);

export const synth = new Tone.DuoSynth({
  vibratoAmount: 0,
  harmonicity: 1,
  voice0: { oscillator: { type: "sine" } },
  voice1: { oscillator: { type: "sine" } },
}).chain(vol, filter, reverb, limiter);
