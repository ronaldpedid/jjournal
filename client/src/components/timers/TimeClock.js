import React, { Component } from 'react'
import styles from './timers.scss';


class TimeClockInput extends Component {
  render() {
    return (
      <div className={styles.timerInput}>
        <h3>Input your desired time.</h3>
        <input
          type="number"
          value={this.props.value}
          onChange={this.props.handleChange}
          required
        />
      </div>
    )
  }
}

class Timer extends Component {
  render() {
    return (
      <div className={styles.timer}>
        <h1>{this.props.value}:{this.props.seconds}</h1>
      </div>
    )
  }
}

class TimeClockStartButton extends Component {
  render() {
    return (
      <button
        disabled={!this.props.value}
        onClick={this.props.startCountDown}
      >Click to Begin</button>

    )
  }
}

class TimeClock5minButton extends Component {
  render() {
    return (
      <button
        onClick={this.props.fiveMinuteCountDown}
      >5 Minutes</button>

    )
  }
}

export class TimeClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: '00',
      value: '',
      isActive: false
    }
    this.secondsRemaining;
    this.intervalHandle;
    this.handleChange = this.handleChange.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
    this.fiveMinuteCountDown = this.fiveMinuteCountDown.bind(this);
    this.tick = this.tick.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  tick() {
    var min = Math.floor(this.secondsRemaining / 60);
    console.log(min);
    var sec = this.secondsRemaining - (min * 60);

    this.setState({
      value: min,
      seconds: sec
    })

    if (sec < 10) {
      this.setState({
        seconds: "0" + this.state.seconds
      })
    }

    if (min < 10) {
      this.setState({
        value: "0" + min
      })
    }

    if (min === 0 && sec === 0) {
      clearInterval(this.intervalHandle);
      this.setState({
        value: "Round",
        seconds: "Ends"
      })
      this.isActive = false
    }

    this.secondsRemaining--
  }

  startCountDown() {
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.value;
    this.secondsRemaining = time * 60;
    this.setState({
      isActive: true
    })
  }

  fiveMinuteCountDown() {
    let time = this.setState({
      value: '5',
      isActive: true
    })
    return time;
  }
  render() {
    const active = this.state.isActive;
    if (active) {
      return (
        <div className={styles.timeClockContainer}>
          <Timer
            value={this.state.value}
            seconds={this.state.seconds} />
        </div>
      );
    } else {
      return (
        <div className={styles.timeClockContainer}>
          <TimeClockInput value={this.state.value} handleChange={this.handleChange} />
          <Timer
            value={this.state.value}
            seconds={this.state.seconds} />
          <TimeClockStartButton startCountDown={this.startCountDown} value={this.state.value} />
          <TimeClock5minButton startCountDown={this.fiveMinuteCountDown} value={this.state.value} />
        </div>
      )
    }

  }
}