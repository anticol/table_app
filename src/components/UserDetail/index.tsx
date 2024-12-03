import React from "react";
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
    const { data: user, isLoading, isError } = useUser(Number(userId))

    if (isLoading) return <Loading />
    if (isError || !user) return <Typography>Error loading user data</Typography>;

    return (
        <Paper sx={{ padding: 4 }}>
            <Box display="flex" alignItems="center" mb={4}>
                <Avatar src={user.avatar} alt={user.username} sx={{ width: 100, height: 100, mr: 3 }} />
                <Box>
                    <Typography variant="h4" gutterBottom>{`${user.first_name} ${user.last_name}`}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {user.username} | {user.email}
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
                            <Typography variant="subtitle1"><strong>Gender:</strong> {user.gender}</Typography>
                            <Typography variant="subtitle1"><strong>Date of Birth:</strong> {user.date_of_birth}</Typography>
                            <Typography variant="subtitle1"><strong>Phone:</strong> {user.phone_number}</Typography>
                            <Typography variant="subtitle1"><strong>Social Insurance Number:</strong> {user.social_insurance_number}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1"><strong>Address:</strong></Typography>
                            <Typography variant="body2">
                                {user.address.street_address}, {user.address.city}, {user.address.state}, {user.address.zip_code}, {user.address.country}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                <strong>Coordinates:</strong> ({user.address.coordinates.lat}, {user.address.coordinates.lng})
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>Employment</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="subtitle1"><strong>Title:</strong> {user.employment.title}</Typography>
                    <Typography variant="subtitle1"><strong>Key Skill:</strong> {user.employment.key_skill}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>Subscription</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="subtitle1"><strong>Plan:</strong> {user.subscription.plan}</Typography>
                    <Typography variant="subtitle1"><strong>Status:</strong> {user.subscription.status}</Typography>
                    <Typography variant="subtitle1"><strong>Payment Method:</strong> {user.subscription.payment_method}</Typography>
                    <Typography variant="subtitle1"><strong>Term:</strong> {user.subscription.term}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>Credit Card</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="subtitle1"><strong>CC Number:</strong> {user.credit_card.cc_number}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};
