import { Alert, Unstable_Grid2 as Grid } from "@mui/material";
import GoogleAuth from "./GoogleAuth"
import FacebookAuth from "./FacebookAuth"

const SocialAuth = () => {
    return (
        <Grid
            container
            spacing={1}>
            <Grid
                xs={12}
            >
                <Alert severity="error">
                    <div style={{fontSize:"14px"}}>
                        You can use <strong>admin@admin.com</strong> and password <strong>Admin123</strong> To be a Admin Guest
                    </div>
                </Alert>
            </Grid>
            <Grid
                xs={12}
            >
                <GoogleAuth />
            </Grid>
            <Grid
                xs={12}
            >
                {/* <FacebookAuth /> */}
            </Grid>
        </Grid>
    )
}

export default SocialAuth
