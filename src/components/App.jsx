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
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.value !== this.state.value ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });
      try {
        const res = await fetchImages(this.state.value, this.state.page);
        console.log(res);
        if (res.hits.length === 0) {
          this.setState({ status: 'rejected' });
          toast.info(
            `Вибачте, але за запитом ${this.state.value} нічого не знайдено`
          );
        }
        // //Остання сторінка запитів
        // const totalPages = Math.ceil(res.totalHits / 12);
        // if (this.state.page === totalPages ) {
        //   toast.info(`You reached end of results`);
        //   this.setState({ isMore: false });
        // }

        if (res.hits.length > 0) {
          this.setState(({ images }) => {
            return {
              images: [...images, ...res.hits],
              status: 'resolved',
            };
          });
          toast.success(`Знайдено ${res.totalHits} зображень`);
        }
        if (this.state.value !== prevState.value) {
          this.setState({ images: res.hits });
        }
        if (res.totalHits > 12 || res.hits === 12) {
          this.setState({ isMore: true });
        }
      } catch (error) {
        toast.info('Шкода, щось пішло не так. Спробуйте ще раз');
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
    const { images, isMore, status } = this.state;
    if (status === 'pending') {
      return <Loader />;
    }
    return (
      <Box>
        <Searchbar handleSubmit={this.handleSubmit} />

        <ImageGallery images={images} />
        {isMore && <Button onClick={this.loadMore} />}
        <ToastContainer autoClose={2000} theme={'dark'} />
        <GlobalStyles />
      </Box>
    );
  }
}
