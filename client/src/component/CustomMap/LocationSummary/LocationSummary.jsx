import React from 'react';
import axios from "axios";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from '@mui/material/Typography';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import MobileStepper from '@mui/material/MobileStepper';
import Button from "@mui/material/Button";

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const locationSummaryStyle = {
    position: "fixed",
    bottom: 0,
    right: 0,
    width: "25%",
    height: "100vh",
    overflow: "auto"
}

export default function LocationSummary({ location }) {
    const [locationYelpId, setLocationYelpId] = React.useState(null);
    const [reviews, setReviews] = React.useState([]);
    const [activeStep, setActiveStep] = React.useState(0);

    React.useEffect(() => {
        if (location) {
            const params = {
                term: location.name,
                location: location.vicinity,
                radius: 100,
                limit: 1
            }

            let paramString = "";
            for (const [key, value] of Object.entries(params)) {
                paramString += `${key}=${value}&`;
            }   
            paramString = paramString.substring(0, paramString.length - 2);

            axios
                .get(`/businesses/search?${paramString}`)
                .then((res) => {
                    if (res.data.businesses.businesses.length !== 0) {
                        const business = res.data.businesses.businesses[0];
                        setLocationYelpId(business.id);
                    }
                    else {
                        setLocationYelpId(null);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [location]);

    React.useEffect(() => {
        if (locationYelpId) {
            axios
                .get(`businesses/${locationYelpId}/reviews`)
                .then((res) => {
                    const newReviews = res.data.reviews.reviews;
                    setReviews(newReviews);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            setReviews([]);
        }
    }, [locationYelpId]);

    return (
        <Box sx={locationSummaryStyle}>
            {
                location &&
                reviews.map((review, index) => {
                    if (activeStep === index) {
                        const user = review.user;
                        const date = new Date(review.time_created);
                        return (
                            <Card key={`card_${review.id}`} variant="outlined">
                                <CardHeader
                                    avatar={<Avatar alt={user.name} src={user.image_url}>{user.name[0]}</Avatar>}
                                    title={user.name}
                                    subheader={`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}
                                />
                                <CardContent>
                                    <Rating value={review.rating} readOnly />
                                    <Typography align='left'>
                                        {review.text}
                                    </Typography>
                                </CardContent>
                                <MobileStepper
                                    variant="dots"
                                    steps={reviews.length}
                                    position="static"
                                    activeStep={activeStep}
                                    nextButton={
                                        <Button
                                            onClick={() => { setActiveStep(activeStep + 1) }}
                                            disabled={activeStep === reviews.length - 1}
                                        >
                                            Next
                                            <KeyboardArrowRight />
                                        </Button>
                                    }
                                    backButton={
                                        <Button
                                            size="small"
                                            onClick={() => { setActiveStep(activeStep - 1) }}
                                            disabled={activeStep === 0}
                                        >
                                            <KeyboardArrowLeft />
                                            Back
                                        </Button>
                                    }
                                />
                            </Card>
                        );
                    }
                })
            }
        </Box>
    );
}