import { Paper, Typography } from "@mui/material"
import Forgetpassword from "../../components/auth/ForgetPassword"
import { styled } from "@mui/system";
import { useState } from "react";


const CenteredContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '78dvh',
});

const CustomPaper = styled(Paper)({
    width: '85%',
    '@media (min-width: 600px)': {
        width: '50%',
    },
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    color: 'primary',
});
const SpacedTypography = styled(Typography)({
    marginBottom: '20px',
});

function ForgetPassword() {
    const [successMessage, setSuccessMessage] = useState('');

    const handleSuccess = (message) => {
        setSuccessMessage(message);
    };
    return (
        <CenteredContainer>
            <CustomPaper>
                {successMessage ? (
                    <Typography variant='h3' fontWeight='bold' align='center' >
                        {successMessage}
                    </Typography>
                ) : (
                    <>
                        <SpacedTypography variant="h2" fontWeight='bold' align='center'>Password Reset</SpacedTypography>
                        <SpacedTypography variant="h5">  Enter Your <b>Email address</b> that you used to register. We'll
                            send you an email with your name and a link to reset your password.</SpacedTypography>
                        <Forgetpassword onSuccess={handleSuccess} />
                    </>
                )}
            </CustomPaper>
        </CenteredContainer>
    );
}

export default ForgetPassword;
