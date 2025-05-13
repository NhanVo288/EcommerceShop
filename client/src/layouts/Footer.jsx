import { IconButton, Tooltip, Typography } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid #ccc',
      paddingTop: "32px",
      paddingBottom: "32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: "2.5rem",
      gap: "16px",
    }}>
      <Typography variant="h5" sx={{ fontWeight: "600" }}>
        Copyright © 2024, Nhan Vo
      </Typography>

      <a
        href="https://github.com/NhanVo288"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Tooltip title='GitHub'>
          <IconButton color='primary'>
            <GitHubIcon />
          </IconButton>
        </Tooltip>
      </a>
    </footer>
  );
};

export default Footer;
