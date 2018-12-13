import React, { Component } from 'react';
import styles from './showcase.scss';
import arrowStyles from '../arrows/arrows.scss';

const imgUrls = [
  'https://visualcocaine.org/public/uploads/large/11509553086hgmcolx2e9j5mmhozc1fxviji9jrfjvznpox7y3lzep4njz7ezpimsqn20t6tcbmkplf8xvcitl7c9u815qj9vmnu3kycwhza9od.jpg',
  'https://wallpaperstock.net/lost-puppy-wallpapers_34246_1920x1080.jpg',
  'https://media4.s-nbcnews.com/i/newscms/2015_50/897431/dog-sleeping-in-bed-today-stock-tease-151211_cd9853550900e9ecd3678bd8dd6ead7b.jpg',
  'https://i.ytimg.com/vi/j0JKIekiWkU/maxresdefault.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNFrb48MJQlepfqsEKKVJh05y1Ac-Umgy3b1xuyDN-pW8IENQ8'
];

export class Showcase extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      currentImageIndex: 0,
      imgNum: 0,
      arrows: false
    }
  }

  handleClick() {
    this.getHero();
  }

  getHero(imgNum) {
    console.log(imgNum);
    this.setState({
      currentImageIndex: imgNum
    })

  }
  populateChildren() {
    return imgUrls.map((i, imgNum) => {
      return <ShowCaseChild
        currentImageIndex={this.currentImageIndex}
        clickFunction={() => this.getHero(imgNum)}
        imgNum={imgNum}
        key={i}
        url={i}
      />
    }
    )
  }

  render() {
    return (
      <div className={styles.scHeroContainer}>
        <ShowCaseHero
          url={imgUrls[this.state.currentImageIndex]} />
        <div className={styles.scImageRow}>
          {this.populateChildren()}
        </div>
      </div>
    )
  }
}



const ShowCaseHero = ({ url }) => {
  const styles = {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  return (
    <div className={styles.scHero} alt="img" style={styles} />
  )
}


const ShowCaseChild = ({ url, clickFunction }) => {
  const styles = {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  return (
    <div className={styles.scThumbnail} alt="img" style={styles} onClick={clickFunction} />
  )
}

const Arrow = ({ direction, clickFunction, glyph }) => (
  <div
    className={`${arrowStyles.slideArrow} ${direction}`}
    onClick={clickFunction}>
    {glyph}
  </div>
)
