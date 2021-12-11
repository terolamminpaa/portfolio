import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

/**
 * Component props
 */
interface Props {
  open: boolean;
  title: string|JSX.Element;
  acceptText: string;
  cancelText: string;
  accept: () => void;
  cancel: () => void;
}

/**
 * Confirm dialog component
 */
export default function ConfirmDialog(props: Props) {
  const { open, title, accept, acceptText, cancel, cancelText } = props;

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={accept} variant="outlined" color="inherit">{acceptText}</Button>
        <Button onClick={cancel} variant="outlined" color="inherit">{cancelText}</Button>
      </DialogActions>
    </Dialog>
  );

}