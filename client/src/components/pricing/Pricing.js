//flippable pricing panels
import React, { Component } from 'react';
import styles from './pricing.scss';

export class PricingPanels extends Component {
  render() {
    return (
      <div className={styles.flipPricingContainer}>
        <PricingPanelContainer className={styles.panelContainer}>
          <PricingPanelRow className={styles.pricingPanelRow}>
            <PricingPanelLeft className={styles.pricingPanelLeft} />
            <PricingPanelCenter className={styles.pricingPanelCenter} />
            <PricingPanelRight className={styles.pricingPanelRight} />
            {this.props.children}
          </PricingPanelRow>
        </PricingPanelContainer>
      </div>
    )
  }
}

class PricingPanelContainer extends Component {
  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    )
  }
}

class PricingPanelRow extends Component {
  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    )
  }
}

class PricingPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: false
    }

    this.handleMouseClick = this.handleMouseClick.bind(this);
  }


  handleMouseClick() {
    console.log('clickered');
    this.setState(this.toggleFlipState);
  }

  toggleFlipState(state) {
    return {
      flipped: !state.flipped
    };
  }

  render() {
    return (
      <div className={this.props.className} onClick={this.handleMouseClick}>

      </div>
    )
  }
}



class PricingPanelLeft extends PricingPanel {
  render() {
    return (
      <div className={this.props.className} onClick={this.handleMouseClick}>
        {!this.state.flipped ?
          <div className={!this.state.flipped + `'pricing' + ${styles.truefront}`} >
            <div className={styles.pricingContent}>
              <h1>Deal 1</h1>
              <p>Deal info</p>
            </div>
          </div> :
          <div className={this.state.flipped + `'pricing' + ${styles.trueback}`}>
            <div className={styles.pricingContentBack}></div>
          </div>}
        {this.props.children}
      </div>
    )
  }
}


class PricingPanelCenter extends PricingPanel {
  render() {
    return (
      <div className={this.props.className} onClick={this.handleMouseClick}>
        {!this.state.flipped ? <div className={!this.state.flipped + `'pricing' + ${styles.truefront}`} >
          <div className={styles.pricingContent}>
            <h1>Deal 2</h1>
            <p>Deal info</p>
          </div>
          {this.props.children}
        </div> :
          <div className={this.state.flipped + `'pricing' + ${styles.trueback}`}>
            <div className={styles.pricingContentBack}></div>
          </div>}
        {this.props.children}
      </div>
    )
  }
}

class PricingPanelRight extends PricingPanel {
  render() {
    return (
      <div className={this.props.className} onClick={this.handleMouseClick}>
        {!this.state.flipped ? <div className={!this.state.flipped + `'pricing' + ${styles.truefront}`} >
          <div className={styles.pricingContent}>
            <h1>Deal 3</h1>
            <p>Deal info</p></div>
        </div> :
          <div className={this.state.flipped + `'pricing' + ${styles.trueback}`}>
            <div className={styles.pricingContentBack}></div>
          </div>}
        {this.props.children}
      </div>
    )
  }
}



