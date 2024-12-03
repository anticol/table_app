import {
    CircularProgress,
    Typography,
} from "@mui/material";

export const Loading = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <CircularProgress />
            <Typography>Loading data...</Typography>
        </div>
    );
};
