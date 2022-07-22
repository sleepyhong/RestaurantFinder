import React from "react";
import { InfoWindow } from '@react-google-maps/api';

// import {Typography, Rating} from '@mui/material';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const locationImgStyle = {
    width: "250px",
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
            <div>
                <h6>{location.name}</h6>
                <p>
                    <a href={`http://maps.google.com/maps?q=${location.vicinity.replace(" ", "+")}`} target="_blank">
                        {location.vicinity}
                    </a>
                </p>
                <p>
                    {
                        location.photos.map((photo, index) => {
                            return (
                                <img
                                    key={index}
                                    src={photo.getUrl()}
                                    style={locationImgStyle}
                                />
                            )
                        })
                    }
                </p>
                <Typography component="legend">Rating</Typography>
                <Rating name="read-only" value={location.rating} readOnly />
            </div>
        </InfoWindow>
    );
}