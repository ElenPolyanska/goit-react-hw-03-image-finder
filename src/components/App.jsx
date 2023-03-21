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
      try {
        const res = await fetchImages(this.state.value, this.state.page);
        this.setState({ status: 'pending' });

        if (res.hits.length === 0) {
          this.setState({ status: 'idle' });
          toast.info(
            `Вибачте, але за запитом ${this.state.value} нічого не знайдено`
          );
        }

        if (this.state.page === 1 && res.hits.length !== 0) {
          toast.success(`Знайдено ${res.totalHits} зображень`);
          this.setState({ images: res.hits, status: 'resolved' });
        } else {
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...res.hits],
              status: 'resolved',
            };
          });
        }
     
        if (res.hits.length === 12 && res.totalHits > 12 ) {
          this.setState({ isMore: true });
        } else {
          this.setState({ isMore: false });
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
    this.setState({ status: 'resolved' });
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
