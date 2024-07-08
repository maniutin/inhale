import "./App.css";
import Filter from "./components/Filter/Filter";
import Reverb from "./components/Reverb/Reverb";
import SynthVoice from "./components/SynthVoice/SynthVoice";
import Volume from "./components/Volume/Volume";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <SynthVoice />
      <Filter />
      <Reverb />
      <Volume />
    </div>
  );
}

export default App;
