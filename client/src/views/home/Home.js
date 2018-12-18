import React, { Component } from 'react';
import { HomeHeader } from '../../components/headers/Headers';
import styles from '../home/home.scss';
import dukeStyles from '../../components/parallax/parallax.scss';
import { ParallaxContainer, ParallaxBackground } from '../../components/parallax/Parallax';
import { TimeClock } from '../../components/timers/TimeClock';
import DraftTextEditor from '../../components/text_editor/Draft';

export class Home extends Component {
  render() {
    return (
      <div className={styles.homeWrapper}>
        <HomeHeader />
        <TimeClock />
        <ParallaxContainer>
          <ParallaxBackground className={dukeStyles.parallaxBackgroundDuke}></ParallaxBackground>
        </ParallaxContainer>
        <DraftTextEditor />
      </div>
    );
  }
}

