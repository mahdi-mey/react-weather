import React from "react";

class Weather extends React.Component {
    render() {
        const {temperature_2m_max: max, temperature_2m_min: min, time: date, weathercode: codes} = this.props.weather


        return (
            <div>
                <h2>Weather in {this.props.location}</h2>
            </div>
        )
    }
}
export default Weather;