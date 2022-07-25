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
                    if (location.name.toLowerCase().includes(searchValue.toLowerCase())) {
                        return (
                            <div key={`list_${location.place_id}`}>
                                <h6>{location.name}</h6>
                                <p>
                                    <a href={`http://maps.google.com/maps?q=${location.vicinity.replace(" ", "+")}`} target="_blank" rel="noopener">
                                        {location.vicinity}
                                    </a>
                                </p>
                            </div>
                        );
                    }
                })
            }
        </div>
    );
}