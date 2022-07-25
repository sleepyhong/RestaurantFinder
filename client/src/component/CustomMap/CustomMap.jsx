import React from "react";
import { GoogleMap, Marker } from '@react-google-maps/api';
import LocationList from "./LocationList/LocationList";
import CustomInfoWindow from "./CustomInfoWindow/CustomInfoWindow";
import LocationSummary from "./LocationSummary/LocationSummary";

const google = window.google;

const mapContainerStyle = {
    width: "75%",
    height: "100vh",
}
const searchBarStyle = {
    boxSizing: `border-box`,
    border: `1px solid transparent`,
    width: `240px`,
    height: `32px`,
    padding: `0 12px`,
    borderRadius: `3px`,
    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    fontSize: `14px`,
    outline: `none`,
    textOverflow: `ellipses`,
    position: "absolute",
    left: "50%",
    marginLeft: "-120px"
}
const randomizerButtonStyle = {
    boxSizing: `border-box`,
    border: `1px solid transparent`,
    width: `240px`,
    height: `32px`,
    padding: `0 12px`,
    borderRadius: `3px`,
    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    fontSize: `14px`,
    outline: `none`,
    textOverflow: `ellipses`,
    position: "absolute",
    left: "0%",
    bottom: "0%",
}


export default function CustomMap() {
    const [service, setService] = React.useState(null);
    const [center, setCenter] = React.useState({
        lat: 0,
        lng: 0
    });
    const [selectedLocation, setSelectedLocation] = React.useState(null);
    const [locations, setLocations] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState("");

    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const newCenter = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                setCenter(newCenter);
            });
        }
    }, []);

    React.useEffect(() => {
        const newLocations = {};
        if (service) {
            service.nearbySearch({
                keyword: "",
                location: center,
                openNow: true,
                rankBy: google.maps.places.RankBy.DISTANCE,
                type: "restaurant"
            }, (result, status, pagination) => {
                if (status === "OK") {
                    for (const location of result) {
                        if (!newLocations[location.name]) {
                            newLocations[location.name] = location;
                        }
                    }

                    if (pagination.hasNextPage) {
                        pagination.nextPage();
                    }
                    else {
                        setLocations(Object.values(newLocations));
                    }
                }
            });
        }
    }, [center]);

    const onMapLoad = (map) => {
        let service = new google.maps.places.PlacesService(map);
        setService(service);
    }

    const onSearchValueChange = (event) => {
        setSearchValue(event.target.value);
        setSelectedLocation(null);
    } 

    const onMarkerClick = (location) => {
        setSelectedLocation(location);
    }

    const chooseRandomLocation = () => {
        const newLocation = locations[Math.floor(Math.random() * locations.length)];
        setSearchValue(newLocation.name);
        setSelectedLocation(newLocation);
    }

    return (
        <div>
            <GoogleMap
                center={center}
                clickableIcons={false}
                zoom={15}
                onLoad={(map) => { onMapLoad(map) }}
                onClick={() => { setSelectedLocation(null) }}
                mapContainerStyle={mapContainerStyle}
            >
                <input
                    type="text"
                    placeholder="Search Restaurant"
                    value={searchValue}
                    onChange={onSearchValueChange}
                    style={searchBarStyle}
                />
                <button onClick={chooseRandomLocation} style={randomizerButtonStyle}>Randomizer</button>
                <Marker
                    icon={"./img/person_pin_circle.png"}
                    position={center}
                />

                {
                    locations.map((location) => {
                        if (location.name.toLowerCase().includes(searchValue.toLowerCase())) {
                            return (
                                <Marker
                                    key={`marker_${location.place_id}`}
                                    title={location.name}
                                    position={{
                                        lat: location.geometry.location.lat(),
                                        lng: location.geometry.location.lng()
                                    }}
                                    onClick={() => { onMarkerClick(location) }}
                                />
                            );
                        }
                    })
                }

                {
                    selectedLocation &&
                    <CustomInfoWindow location={selectedLocation} setSelectedlocation={setSelectedLocation} />
                }
            </GoogleMap>
            {/* <LocationList locations={locations} searchValue={searchValue} /> */}
            <LocationSummary location={selectedLocation}/>
        </div>
    );
}