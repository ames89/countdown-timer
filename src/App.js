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
    this.setLocalInterval();
    window.addEventListener("click", this.playPauseTimer);
    window.oncontextmenu = () => !!this.resetTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener("click", this.playPauseTimer);
  }

  setLocalInterval = () => {
    this.interval = setInterval(this.setWidth, 1000);
  };

  playTimer = () => {
    if (!this.interval) {
      this.setLocalInterval();
    }
  };

  pauseTimer = () => {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  };

  playPauseTimer = () => {
    if (this.interval) {
      this.pauseTimer();
    } else {
      this.playTimer();
    }
  };

  resetTimer = () => {
    this.currentTime = 0;
    this.pauseTimer();
    this.setWidth();
  };

  setWidth = () => {
    this.currentTime += 1000;
    const newWidth = currentPercentageTime(this.currentTime);
    if (newWidth === 100) {
      this.pauseTimer();
    }
    this.setState({
      width: `${newWidth}%`
    });
  };

  render() {
    return (
      <div
        className="outer-App"
        style={{
          backgroundColor: this.state.background,
          borderColor: this.state.color
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
