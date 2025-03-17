import React from "react";
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';


export default function ParkWidget({park}){ //Component to display the details of the property
    const { width, height } = useWindowSize();

    return (<>
        <h1>Your Nearest National park.</h1>
        <h2>{park.nearest_national_park}</h2>
        <h2>{park.inPark ? "Congratulations! You are in a national park" : "You are not in a national park"}</h2>
        {park.inPark ?
            <Confetti
                width={width}
                height={height}
            /> : null}
        <p>
            {!park.inPark ? (
                <>
                    Distance away: <b>{Math.round(park.distance)}m</b>
                </>
            ) : (
                ""
            )}
        </p>
    </>);

}
