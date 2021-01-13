import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

class ImageWithFallback extends Component {
  render() {
    const {
      alt, imageUrl, imageUrlFallback, className,
    } = this.props;
    return (
      // If the object can't load the imageUrl, it will fallback to the Image inside the <object>
      <object data={imageUrl} type="image/png" className={`flex-middle ${className}`}>
        <Image src={imageUrlFallback} alt={alt} className="w-100" />
      </object>
    );
  }
}

ImageWithFallback.propTypes = {
  alt: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  imageUrlFallback: PropTypes.string.isRequired,
};

export default ImageWithFallback;
