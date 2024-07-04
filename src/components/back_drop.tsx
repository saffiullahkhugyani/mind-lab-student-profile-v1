import { Backdrop, CircularProgress } from "@mui/material";

interface BackDropProps {
  toggle: boolean;
  handleClose: () => void;
}

const BackDrop = ({ toggle, handleClose }: BackDropProps) => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={toggle}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default BackDrop;
