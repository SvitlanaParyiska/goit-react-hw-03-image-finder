import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';

export class Searchbar extends Component {
  state = {
    searchItem: '',
  };

  handleSearchItemChange = event => {
    this.setState({ searchItem: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchItem.trim() === '') {
      Notiflix.Report.info('Fill in the search param!');
    }
    this.props.onSubmit(this.state.searchItem);
    this.setState({ searchItem: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <FcSearch />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            className="input"
            type="text"
            autoComplete="off"
            name="searchItem"
            value={this.state.searchItem}
            onChange={this.handleSearchItemChange}
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
