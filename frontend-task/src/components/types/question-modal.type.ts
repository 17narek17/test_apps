import React from "react";

export type QuestionModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIntervalCheck: React.Dispatch<
    React.SetStateAction<number | ReturnType<typeof setInterval>>
  >;
  intervalCheck: number | ReturnType<typeof setInterval>;
};
