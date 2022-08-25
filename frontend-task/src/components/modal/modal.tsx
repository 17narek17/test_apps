import React, { useEffect, useState } from "react";
import { QuestionModalProps } from "../types/question-modal.type";
import {
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

export const QuestionModal: React.FC<QuestionModalProps> = ({
  isOpen,
  setIsOpen,
  player
}) => {
  const [userAnswer, setUserAnswer] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [intervalCheck, setIntervalCheck] = useState<
    number | ReturnType<typeof setInterval>
  >(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(+(event.target as HTMLInputElement).value);
  };

  const handleSubmit = () => {
    if (userAnswer === 5) {
      setIsOpen(true);
      clearInterval(intervalCheck);
      setIntervalCheck(0);
      return;
    }

    setErrorMessage("Answer is not correct");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (player?.current && player.current?.getCurrentTime() > 64)
        setIsOpen(false);
    }, 1000);

    setIntervalCheck(interval);

    return () => clearInterval(interval);
  }, [])

  return (
    <Modal
      open={!isOpen}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="modal-content">
        <Typography>3 + 2 = ?</Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="3"
          name="radio-buttons-group"
          onChange={handleChange}
        >
          <FormControlLabel value="3" control={<Radio />} label="3" />
          <FormControlLabel value="5" control={<Radio />} label="5" />
          <FormControlLabel value="8" control={<Radio />} label="8" />
          <FormControlLabel value="4" control={<Radio />} label="4" />
        </RadioGroup>
        {errorMessage && (
          <Typography className="error-message">{errorMessage}</Typography>
        )}
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </Modal>
  );
};
