import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface SnackBarProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const CustomizedSnackbars = ({ show, message, onClose }: SnackBarProps) => {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={show}
        autoHideDuration={6000}
        onClose={onClose}
      >
        <Alert
          onClose={onClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbars;
