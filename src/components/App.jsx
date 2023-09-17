import { Component } from 'react';
import Notiflix from 'notiflix';
import { getAllImages } from 'api/images';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { Modal } from './Modal/Modal';
import { Body } from './App.styled';

export class App extends Component {
  state = {
    searchItem: '',
    searchArr: [],
    loading: false,
    isShowModal: false,
    page: 1,
    totalSearchItems: 0,
    showPicture: '',
  };

  componentDidUpdate(_, prevState) {
    const { searchItem, page } = this.state;

    if (prevState.searchItem !== searchItem || page !== prevState.page) {
      if (!searchItem) {
        Notiflix.Report.info('Fill in the search param!');
        return;
      }
      this.setState({ loading: true });
      getAllImages(searchItem, page)
        .then(data =>
          this.setState({
            searchArr:
              page === 1 ? data.hits : [...prevState.searchArr, ...data.hits],
            totalSearchItems: data.totalHits,
          })
        )
        .catch(error => Notiflix.Report.failure(error.message))
        .finally(() => this.setState({ loading: false }));
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
    const {
      searchItem,
      searchArr,
      loading,
      isShowModal,
      totalSearchItems,
      showPicture,
    } = this.state;
    return (
      <Body>
        <Searchbar onSubmit={this.searchSubmit} />
        {searchArr.length > 0 ? (
          <ImageGallery
            searchArr={searchArr}
            searchName={searchItem}
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
        {loading && <Loader />}
        {searchArr.length !== totalSearchItems && (
          <Button pageUp={this.pageUp} />
        )}
        {isShowModal && (
          <Modal
            showPicture={showPicture}
            searchName={searchItem}
            closeModal={this.closeModal}
          />
        )}
      </Body>
    );
  }
}
