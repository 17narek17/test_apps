import React, { useState } from "react";
import {
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { QuestionModalProps } from "../types/question-modal.type";

export const QuestionModal: React.FC<QuestionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [userAnswer, setUserAnswer] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(+(event.target as HTMLInputElement).value);
  };

  const handleSubmit = () => {
    if (userAnswer === 5) {
      onClose(true);
      return;
    }

    setErrorMessage("Answer is not correct");
  };

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
