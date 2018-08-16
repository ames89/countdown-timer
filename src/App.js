import * as React from "react";
import {
  currentPercentageTime,
  getLocalStorageTime,
  queryObject
} from "./utils";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.currentTime = getLocalStorageTime();

    this.state = {
      width: `${currentPercentageTime(this.currentTime)}%`,
      color: queryObject().color || "red",
      background: queryObject().background || "white"
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.setWidth, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setWidth = () => {
    this.currentTime += 1000;
    this.setState({
      width: `${currentPercentageTime(this.currentTime)}%`
    });
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: this.state.background
        }}
      >
        <div
          className="App"
          style={{
            width: this.state.width,
            backgroundColor: this.state.color
          }}
        />
      </div>
    );
  }
}

export default App;
