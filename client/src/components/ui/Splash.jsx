import Lottie from "lottie-react";
import animationData from "../../assets/animations/eCommerceShope_Spach_animation.json";
import { Box } from "@mui/material";

const Splash = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Lottie 
        animationData={animationData} 
        loop={true} 
        autoplay={true} 
        style={{ width: 300, height: 300 }} 
      />
    </Box>
  );
};

export default Splash;
