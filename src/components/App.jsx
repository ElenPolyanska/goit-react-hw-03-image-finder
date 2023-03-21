import { Component } from 'react';
import { GlobalStyles } from './GlobalStyles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../services/fetch';
import { Box } from './Box.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    value: '',
    page: 1,
    images: [],
    isMore: false,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.value !== this.state.value ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ isLoading: true });
        const res = await fetchImages(this.state.value, this.state.page);
        this.setState({ isLoading: false });

        if (res.hits.length === 0) {
          toast.info(
            `Вибачте, але за запитом ${this.state.value} нічого не знайдено`
          );
        }

        if (res.hits.length !== 0) {
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...res.hits],
            };
          });
        }
        if (this.state.page === 1 && res.totalHits) {
          toast.success(`Знайдено ${res.totalHits} зображень`);
        }

        if (res.hits.length === 12 && res.totalHits > 12) {
          this.setState({ isMore: true });
        } else {
          this.setState({ isMore: false });
        }
      } catch (error) {
        toast.info('Шкода, щось пішло не так. Спробуйте ще раз');
      }
    }
  }

  handleSubmit = value => {
    this.setState({ value, page: 1, images: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isMore, isLoading } = this.state;

    return (
      <Box>
        <Searchbar handleSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        <ImageGallery images={images} />
        {isMore && <Button onClick={this.loadMore} />}
        <ToastContainer autoClose={2000} theme={'dark'} />
        <GlobalStyles />
      </Box>
    );
  }
}
