import { useParams } from "react-router-dom";
import {
    Box,
    Typography,
    Avatar,
    Paper,
    Divider,
    Grid,
} from "@mui/material";
import { Loading } from "../UsersTable/Loading";
import { useUser } from "../../hooks/useFetchUser";

export const UserDetailPage = () => {
    const { userId } = useParams<{ userId: string }>();
    const { data: user, isLoading, isError } = useUser(Number(userId));

    if (isLoading) return <Loading />;
    if (isError || !user) return <Typography>Error loading user data</Typography>;

    const {
        avatar,
        username,
        first_name,
        last_name,
        email,
        gender,
        date_of_birth,
        phone_number,
        social_insurance_number,
        address: {
            street_address,
            city,
            state,
            zip_code,
            country,
            coordinates: { lat, lng },
        },
        employment: { title, key_skill },
        subscription: { plan, status, payment_method, term },
        credit_card: { cc_number },
    } = user;

    return (
        <Paper sx={{ padding: 4 }}>
            <Box display="flex" alignItems="center" mb={4}>
                <Avatar src={avatar} alt={username} sx={{ width: 100, height: 100, mr: 3 }} />
                <Box>
                    <Typography variant="h4" gutterBottom>{`${first_name} ${last_name}`}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {username} | {email}
                    </Typography>
                </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>Personal Information</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1"><strong>Gender:</strong> {gender}</Typography>
                            <Typography variant="subtitle1"><strong>Date of Birth:</strong> {date_of_birth}</Typography>
                            <Typography variant="subtitle1"><strong>Phone:</strong> {phone_number}</Typography>
                            <Typography variant="subtitle1"><strong>Social Insurance Number:</strong> {social_insurance_number}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1"><strong>Address:</strong></Typography>
                            <Typography variant="body2">
                                {street_address}, {city}, {state}, {zip_code}, {country}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                <strong>Coordinates:</strong> ({lat}, {lng})
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>Employment</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="subtitle1"><strong>Title:</strong> {title}</Typography>
                    <Typography variant="subtitle1"><strong>Key Skill:</strong> {key_skill}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>Subscription</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="subtitle1"><strong>Plan:</strong> {plan}</Typography>
                    <Typography variant="subtitle1"><strong>Status:</strong> {status}</Typography>
                    <Typography variant="subtitle1"><strong>Payment Method:</strong> {payment_method}</Typography>
                    <Typography variant="subtitle1"><strong>Term:</strong> {term}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>Credit Card</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="subtitle1"><strong>CC Number:</strong> {cc_number}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};
