import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";

interface Props {
  children: React.ReactNode;
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  error?: string;
}

const ModalWrapper = ({
  children,
  title,
  modalOpen,
  onClose,
  error,
}: Props) => (
  <Dialog
    fullWidth={true}
    open={modalOpen}
    onClose={() => onClose()}
  >
    <DialogTitle>{title}</DialogTitle>
    <Divider />
    <DialogContent>
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}
      {children}
    </DialogContent>
  </Dialog>
);

export default ModalWrapper;
