import * as Tone from "tone";

const synth = new Tone.MonoSynth({
  oscillator: { type: "sine" },
}).toDestination();

function SynthVoice() {
  const playSynth = () => {
    // synth.triggerAttackRelease("C5", "1n");

    new Tone.Loop(() => {
      synth.triggerAttackRelease("C4", 1);
    }, 2).start();

    Tone.Transport.start();
    Tone.start();
  };
  return <button onClick={playSynth}>Play</button>;
}

export default SynthVoice;
