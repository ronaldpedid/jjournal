import React, { Component } from 'react';
import styles from './carousel.scss';

const imgUrls = [
  'https://visualcocaine.org/public/uploads/large/11509553086hgmcolx2e9j5mmhozc1fxviji9jrfjvznpox7y3lzep4njz7ezpimsqn20t6tcbmkplf8xvcitl7c9u815qj9vmnu3kycwhza9od.jpg',
  'https://wallpaperstock.net/lost-puppy-wallpapers_34246_1920x1080.jpg',
  'https://media4.s-nbcnews.com/i/newscms/2015_50/897431/dog-sleeping-in-bed-today-stock-tease-151211_cd9853550900e9ecd3678bd8dd6ead7b.jpg',
  'https://i.ytimg.com/vi/j0JKIekiWkU/maxresdefault.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNFrb48MJQlepfqsEKKVJh05y1Ac-Umgy3b1xuyDN-pW8IENQ8'
];

export class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 0,
      dots: true,
      arrows: false,
      dotNum: 0
    }

    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
    this.getSlide = this.getSlide.bind(this);
  }
  previousSlide() {
    const lastIndex = imgUrls.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

    this.setState({
      currentImageIndex: index
    });
  }

  populateDots() {
    const dots = this.state.dots;
    if (dots) {
      return imgUrls.map((i, dotNum) => {
        return <Dot
          currentImageIndex={this.state.currentImageIndex}
          key={i}
          dotNum={dotNum}
          clickFunction={() => this.getSlide(dotNum)} />
      });
    }
    return null;
  }

  getSlide(dotNum) {

    this.setState({
      currentImageIndex: dotNum
    })

  }
  nextSlide() {
    const lastIndex = imgUrls.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;

    this.setState({
      currentImageIndex: index
    });
  }

  render() {
    return (
      <div className={styles.carouselContainer}>
        {this.state.arrows ? <Arrow
          direction="left"
          clickFunction={this.previousSlide}
          glyph="&#9664;" /> : false}


        <div className={styles.carouselDotRow}>
          {this.populateDots()}
        </div>
        <Slider url={imgUrls[this.state.currentImageIndex]} />

        {this.state.arrows ? <Arrow
          direction="right"
          clickFunction={this.nextSlide}
          glyph="&#9654;" /> : false}


      </div>
    );
  }
}

const Slider = ({ url }) => {
  const styles = {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  return (
    <div className={styles.slideDot} style={styles}>

    </div>
  )
}

const Arrow = ({ direction, clickFunction, glyph }) => (
  <div
    className={`${styles.slideArrow} + ${styles.direction}`}
    onClick={clickFunction}>
    {glyph}
  </div>
)

const Dot = ({ clickFunction, dotNum, currentImageIndex }) => (
  <div
    className={dotNum === currentImageIndex ? `${styles.carouselSlideDot} + ${styles.active}` : `${styles.carouselSlideDot}`}
    onClick={clickFunction}>
  </div>
)