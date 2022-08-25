import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { QuestionModal } from "./components/modal/modal";

function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [intervalCheck, setIntervalCheck] = useState<
    number | ReturnType<typeof setInterval>
  >(0);
  const player = useRef<ReactPlayer | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (player.current && player.current?.getCurrentTime() > 64)
        setIsPlaying(false);
    }, 1000);

    setIntervalCheck(interval);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <ReactPlayer
        url={process.env.REACT_APP_VIDEO_URL}
        ref={player}
        playing={isPlaying}
      />
      <QuestionModal
        onClose={(isPlaying: boolean) => setIsPlaying(isPlaying)}
        isOpen={isPlaying}
        setIntervalCheck={setIntervalCheck}
        intervalCheck={intervalCheck}
      />
    </div>
  );
}

export default App;
