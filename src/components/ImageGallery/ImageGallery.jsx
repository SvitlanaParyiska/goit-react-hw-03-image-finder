import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

const ImageGallery = ({ searchArr, searchName, showModal }) => {
  return (
    <ImageGalleryList>
      {searchArr.map(el => (
        <ImageGalleryItem
          key={el.id}
          picture={el.webformatURL}
          largePicture={el.largeImageURL}
          searchName={searchName}
          showModal={showModal}
        />
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  searchArr: PropTypes.array.isRequired,
  searchName: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default ImageGallery;
