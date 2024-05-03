import * as Tone from "tone";

const synth = new Tone.MonoSynth({
  oscillator: { type: "sine" },
}).toDestination();

const playSynth = () => {
  synth.triggerAttackRelease("C5", "2n");
};

function SynthVoice() {
  return <button onClick={playSynth}>Play</button>;
}

export default SynthVoice;
