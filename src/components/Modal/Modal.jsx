import React from 'react';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { ModalDiv, ModalOverlay } from './Modal.styled';

//{ showPicture, searchName, closeModal }

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseModal);
  }

  onCloseModal = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { showPicture, searchName } = this.props;

    return (
      <ModalOverlay onClick={this.onCloseModal}>
        <ModalDiv>
          <img src={showPicture} alt={searchName} />
        </ModalDiv>
      </ModalOverlay>
    );
  }
}

Modal.propTypes = {
  showPicture: PropTypes.string.isRequired,
  searchName: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
