import React from "react";
import { InfoWindow } from '@react-google-maps/api';


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
            </div>
        </InfoWindow>
    );
}