import React, { Component } from 'react';
import { HomeHeader } from '../../components/headers/Headers';
import styles from '../home/home.scss';
import dukeStyles from '../../components/parallax/parallax.scss';
import { SiteNavigation } from '../../components/navigation/Navigation';
import { ParallaxContainer, ParallaxBackground } from '../../components/parallax/Parallax';
import axios from 'axios';
import { TimeClock } from '../../components/timers/TimeClock';

export class Home extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      user: {}
    }
  }

  // componentDidMount() {
  //   this.setState({ loading: true })
  //   axios.get('/api/current_user')
  //     .then(response => response.json(user))
  //     .then(user => this.setState({
  //       loading: false,
  //       user: user
  //     })
  //     )
  //   console.log(this.state.user);
  // }


  render() {
    // const User = () => this.state.loading ? "loading..." : [this.state.user]
    return (
      <div className={styles.homeWrapper}>
        <SiteNavigation />
        <HomeHeader />
        <TimeClock />
        <ParallaxContainer>
          <ParallaxBackground className={dukeStyles.parallaxBackgroundDuke}></ParallaxBackground>
        </ParallaxContainer>
      </div>
    );
  }
}

