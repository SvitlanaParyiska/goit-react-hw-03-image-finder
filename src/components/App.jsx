import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { Modal } from './Modal/Modal';
import { Body } from './App.styled';

const API_KEY = '38612355-8184a077488cb30f59b3deec8';

export class App extends Component {
  state = {
    searchItem: '',
    searchArr: [],
    loading: false,
    isShowModal: false,
    page: 1,
    showPicture: '',
  };

  componentDidUpdate(_, prevState) {
    const { searchItem, page } = this.state;
    if (prevState.searchItem !== searchItem || page !== prevState.page) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${searchItem}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(resp => resp.json())
        .then(data =>
          this.setState({
            searchArr:
              page === 1 ? data.hits : [...prevState.searchArr, ...data.hits],
          })
        )
        .catch(error => console.log(error))
        .finally(this.setState({ loading: false }));
    }
  }

  searchSubmit = searchItem => {
    this.setState({ searchItem: searchItem, page: 1 });
  };

  pageUp = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  showModal = largePicture => {
    this.setState({ isShowModal: true, showPicture: largePicture });
  };

  closeModal = () => {
    this.setState({ isShowModal: false, showPicture: '' });
  };

  render() {
    return (
      <Body>
        <Searchbar onSubmit={this.searchSubmit} />
        {this.state.searchArr.length > 0 ? (
          <ImageGallery
            searchArr={this.state.searchArr}
            searchName={this.state.searchItem}
            showModal={this.showModal}
          />
        ) : (
          <p
            style={{
              padding: 100,
              textAlign: 'center',
              fontSize: 30,
            }}
          >
            Image gallery is empty...
          </p>
        )}
        {this.state.loading && <Loader />}
        {this.state.searchArr.length > 0 && <Button pageUp={this.pageUp} />}
        {this.state.isShowModal && (
          <Modal
            showPicture={this.state.showPicture}
            searchName={this.state.searchItem}
            closeModal={this.closeModal}
          />
        )}
      </Body>
    );
  }
}
