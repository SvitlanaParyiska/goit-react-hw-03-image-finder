import React from 'react';
import PropTypes from 'prop-types';
import { ImageItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ picture, largePicture, searchName, showModal }) => {
  return (
    <ImageItem>
      <Image
        src={picture}
        alt={searchName}
        onClick={() => showModal(largePicture)}
      />
    </ImageItem>
  );
};

ImageGalleryItem.propTypes = {
  picture: PropTypes.string.isRequired,
  largePicture: PropTypes.string.isRequired,
  searchName: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
