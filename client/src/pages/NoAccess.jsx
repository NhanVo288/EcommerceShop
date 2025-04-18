import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CustomButton from '../components/ui/CustomButton';

const NotAuthorized = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
            }}
        >
            <Typography variant="h1" component="h1" gutterBottom>
                Not Authorized
            </Typography>
            <Typography variant="h3" gutterBottom>
                You are not authorized to access this page.
            </Typography>
            <CustomButton component={Link} to="/" variant="outlined" color="primary">
                Go Home
            </CustomButton>
        </Box>
    );
};

export default NotAuthorized;
