import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { QuestionModal } from "./components/modal/modal";

function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const player = useRef<ReactPlayer | null>(null);

  return (
    <div className="App">
      <ReactPlayer
        url={"https://youtu.be/uONIJ5TQ2DA"}
        ref={player}
        playing={isPlaying}
      />
      <QuestionModal
        setIsOpen={(isPlaying: boolean) => setIsPlaying(isPlaying)}
        isOpen={isPlaying}
        player={player}
      />
    </div>
  );
}

export default App;
