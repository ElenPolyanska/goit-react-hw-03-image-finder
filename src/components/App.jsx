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
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.value !== this.state.value ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });
      try {
        const response = await fetchImages(this.state.value, this.state.page);
        if (response.length === 0) {
          this.setState({ status: 'rejected' });
          toast.info(
            `Вибачте, але за запитом ${this.state.value} нічого не знайдено`
          );
        }
        // //Остання сторінка запитів
        // const totalPages = Math.ceil(response.totalHits / 12);
        // if (this.state.page === totalPages && this.state.page > 1) {
        //   toast.info(`You reached end of results`);
        // }

        if (response.length > 0) {
          this.setState(({ images }) => {
            return {
              images: [...images, ...response],
              status: 'resolved',
            };
          });
          toast.success(`Знайдено ${response.totalHits} зображень`);
        }
        if (response.length > 12) {
          this.setState({ isMore: true });
        }
      } catch (error) {
        this.setState({
          status: 'idle',
        });
      }
    }
  }

  handleSubmit = value => {
    this.setState({ value, page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isMore, status, isLoading } = this.state;
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return toast.error('Шкода, щось пішло не так. Спробуйте ще раз');
    }
    if (status === 'resolved') {
      this.setState({ isLoading: true });
    }
    return (
      <Box>
        <Searchbar handleSubmit={this.handleSubmit} />

        {isLoading && <ImageGallery images={images} />}
        {isMore && <Button onClick={this.loadMore} />}
        <ToastContainer autoClose={2000} theme={'dark'} />
        <GlobalStyles />
      </Box>
    );
  }
}
