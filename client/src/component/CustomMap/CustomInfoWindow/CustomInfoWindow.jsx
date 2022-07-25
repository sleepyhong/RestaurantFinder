import React from "react";
import { InfoWindow } from '@react-google-maps/api';

// import {Typography, Rating} from '@mui/material';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const locationImgStyle = {
    width: "300px",
    height: "auto"
}

export default function CustomInfoWindow({ location, setSelectedlocation }) {
    return (
        <InfoWindow
            position={{
                lat: location.geometry.location.lat(),
                lng: location.geometry.location.lng()
            }}
            onCloseClick={() => { setSelectedlocation(null) }}
        >
            <Box component="div">
                <Typography variant="h6">{location.name}</Typography>
                <Typography>
                    <a href={`http://maps.google.com/maps?q=${location.vicinity.replace(" ", "+")}`} target="_blank" rel="noopener">
                        {location.vicinity}
                    </a>
                </Typography>
                <Box component="div">
                    {
                        location.photos && location.photos.map((photo, index) => {
                            return (
                                <img
                                    key={index}
                                    src={photo.getUrl()}
                                    style={locationImgStyle}
                                />
                            )
                        })
                    }
                </Box>
                <Typography component="legend">Rating</Typography>
                <Rating name="read-only" value={location.rating} readOnly />
            </Box>
        </InfoWindow>
    );
}