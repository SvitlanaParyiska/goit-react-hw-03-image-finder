import React from 'react';
import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.styled';

const Button = ({ pageUp }) => {
  return <ButtonLoadMore onClick={pageUp}>Load more</ButtonLoadMore>;
};

Button.propTypes = {
  pageUp: PropTypes.func.isRequired,
};

export default Button;
