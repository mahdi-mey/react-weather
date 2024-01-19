import React from "react";
import Weather from "./Weather";

function convertToFlag(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

class App extends React.Component {
    
    state = {
        location: '',
        isLoading: false,
        displayLocation: '',
        weather: {}
    }

    fetchWeather = async () => {
        try {
            this.setState({isLoading: true})
            // 1) Getting location (geocoding)
            const geoRes = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
            );
            const geoData = await geoRes.json();
            console.log(geoData);
    
            if (!geoData.results) throw new Error("Location not found");
    
            const { latitude, longitude, timezone, name, country_code } =
                geoData.results.at(0);
            this.setState({displayLocation: `${name} ${convertToFlag(country_code)}`});
    
            // 2) Getting actual weather
            const weatherRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
            );
            const weatherData = await weatherRes.json();
            this.setState({weather: weatherData.daily});
        } catch (err) {
            // console.err(err);
        }
        finally{
            this.setState({isLoading: false});
        }
    }


    render() {
        return (
            <div className="app">
                <h1>Weather App</h1>
                <div>
                    <input type="text" placeholder="Search for location" onChange={e => this.setState({ location: e.target.value })} />
                </div>
                <button className="get-weather-btn" onClick={this.fetchWeather}>Get Weather</button>
                {this.state.isLoading && <p className="loader">loading</p>}
                {this.state.weather.weathercode && <Weather weather={this.state.weather} location={this.state.displayLocation} />}
            </div>
        )
    }
}

export default App