import React from "react";
import Day from "./Day";

class Weather extends React.Component {
    render() {
        const {temperature_2m_max: max, temperature_2m_min: min, time: dates, weathercode: codes} = this.props.weather


        return (
            <div>
                <h2>Weather in {this.props.location}</h2>
                <ul className="weather">
                    {
                        dates.map((date, i) => (
                            <Day date={date} max={max[i]} min={min[i]} codes={codes[i]} key={date} />
                        ))
                    }
                </ul>
            </div>
        )
    }
}
export default Weather;