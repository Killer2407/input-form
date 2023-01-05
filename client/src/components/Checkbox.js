import Multiselect from 'multiselect-react-dropdown'
import React, { useState } from 'react'

const Dropdown = ({ updateGames }) => {

    const sports = [
        "Golf", "Tennis", "Cricket", "BasketBall", "Baseball", "American Football",
        "Aquatics", "Archery", "Automobile Racing", "Badminton", "Beach VolleyBall", "Bobsleigh",
        "Body Building", "Boxing", "Cross Country Running", "Cross Country Skiing", "Curling",
        "Cycling", "Darts", "Decathlon", "Down Hill Skiing", "Equestrianism",
        "eSports", "Fencing", "Field Hockey", "Figure Skating", "Gymnastics", "Ice Hockey", "Martial Arts", "Mixed Martial Arts",
        "Modern Pentathlon", "Motorcycle Racing", "Netball", "Polo", "Racquetball",
        "Rowing", "Rugby", "Sailing", "Softball", "Shooting", "Skateboarding", "Skeet Shooting",
        "Skeleton", "Snow Boarding", "Soccer (Football)", "Squash", "Surfing", "Swimming", "Track & Field"
    ]
    const [checked, setChecked] = useState([]);

    const updateForm = (value) => {
        updateGames(value.join(","));
        setChecked(value.join(","));
    }
    
    return (
        <div className="sports_game">
            <form>
                <label htmlFor="sports" >Sports:</label>
                <Multiselect
                    isObject={false}
                    onSelect={(value) => updateForm(value)}
                    onRemove={(value) => updateForm(value)}
                    options={sports}
                    showCheckbox
                />
            </form>
        </div>
    )
}

export default Dropdown
