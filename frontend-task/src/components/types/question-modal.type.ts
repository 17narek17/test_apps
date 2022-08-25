import { MutableRefObject } from 'react';
import ReactPlayer from 'react-player';
export type QuestionModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  player: MutableRefObject<ReactPlayer | null>
};
