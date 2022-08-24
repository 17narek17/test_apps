import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { QuestionModal } from "./components/modal/modal";

function App() {
  const [isPlaying, setIsPLaying] = useState<boolean>(true);
  const [userAnswer, setUserAnswer] = useState<string>("0");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [perSecondCheck, setPerSecondCheck] = useState<
    number | ReturnType<typeof setInterval>
  >(0);
  const player = useRef<ReactPlayer | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (player?.current && player.current?.getCurrentTime() > 64)
        setIsPLaying(false);
    }, 1000);

    setPerSecondCheck(interval);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer((event.target as HTMLInputElement).value);
  };

  const handleSubmit = () => {
    if (userAnswer === "5") {
      setIsPLaying(true);
      clearInterval(perSecondCheck);
      setPerSecondCheck(0);
      return;
    }

    setErrorMessage("Answer is not correct");
  };

  return (
    <div className="App">
      <ReactPlayer
        url={"https://youtu.be/uONIJ5TQ2DA"}
        ref={player}
        playing={isPlaying}
      />
      <QuestionModal
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isOpen={isPlaying}
      />
    </div>
  );
}

export default App;
