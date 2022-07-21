import React from "react";

const locationListStyle = {
    position: "fixed",
    bottom: 0,
    right: 0,
    width: "25%",
    height: "100vh",
    overflow: "auto"
}

export default function LocationList({ locations, searchValue }) {
    return (
        <div style={locationListStyle}>
            {
                locations.map((location) => {
                    return (
                        <>
                            {
                                location.name.toLowerCase().includes(searchValue.toLowerCase()) &&
                                <div key={`list_${location.name}`}>
                                    <h6>{location.name}</h6>
                                    <p>
                                        <a href={`http://maps.google.com/maps?q=${location.vicinity.replace(" ", "+")}`} target="_blank">
                                            {location.vicinity}
                                        </a>
                                    </p>
                                </div>
                            }
                        </>
                    );
                })
            }
        </div>
    );
}