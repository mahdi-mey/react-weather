import React from "react";

class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            location: ''
        }
    }


    render(){
        return(
            <div className="app">
                <h1>Weather App</h1>
                <div>
                    <input type="text" placeholder="Search for location"  onChange={e => this.setState({location: e.target.value})} />
                </div>
                <button>Get Weather</button>
            </div>
        )
    }
}

export default App