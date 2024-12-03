import {
    Button,
    Typography,
} from "@mui/material";

interface ErrorProps {
    refetch: () => void;
}

export const Error = ({ refetch }: ErrorProps) => {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Typography color="error">Failed to fetch data</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => refetch()}
            >
                Retry
            </Button>
        </div>
    );
};
