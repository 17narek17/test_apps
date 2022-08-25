export type QuestionModalProps = {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  intervalCheck: number | ReturnType<typeof setInterval>
};
