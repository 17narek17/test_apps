import React from 'react';

export type QuestionModalProps = {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  setIntervalCheck: React.Dispatch<React.SetStateAction<number | ReturnType<typeof setInterval>>>
  intervalCheck: number | ReturnType<typeof setInterval>
};
