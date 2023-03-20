// import { Component } from 'react';
// import PropTypes from 'prop-types';



import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
// import { Button } from '../Button/Button';


export const ImageGallery = ({ images }) => {
  return (
    <Gallery>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
        />
      ))}
    </Gallery>
  );
};

// const Status = {
//   IDLE: 'idle',
//   SUCCESS: 'success',
// };

// export class ImageGallery extends Component {
//   state = {
//     status: Status.IDLE,
//     images: [],
//     isLoading: false,
//     // isMore: false,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { query, page } = this.props;

//     if (prevProps.query !== query || prevProps.page !== page) {
//       this.setState({
//         isLoading: true,
//       });

//       try {
//         const data = await fetchImages(query, page);

//         // Пусте поле інпуту
//         // if (!query) {
//         //   toast.info(`The field is empty. Please enter the word.`);
//         //   return;
//         // }

//         // // Повернення пустого масиву з бекенду
//         // if (data.hits.length === 0) {
//         //   this.setState({
//         //     status: Status.IDLE,
//         //     isMore: false,
//         //   });
//         //   toast.error('No results were found for your request');
//         //   return;
//         // }

//         this.setState({
//           isMore: data.hits.length === 12,
//         });

//         const images = data.hits.map(
//           ({ id, webformatURL, largeImageURL, tags }) => ({
//             id,
//             webformatURL,
//             largeImageURL,
//             tags,
//           })
//         );

//         // Перевірка на новий запит
//         if (prevProps.query !== query) {
//           toast.success(`We found ${data.totalHits} images`);
//           this.setState({
//             status: 'resolved',
//             images: [...images],
//           });
//         } else {
//           this.setState({
//             images: [...prevState.images, ...images],
//           });
//         }

//         //Остання сторінка запитів
//         const totalPages = Math.ceil(data.totalHits / 12);
//         if (page === totalPages && page > 1) {
//           toast.info(`You reached end of results`);
//         }
//       } catch (error) {
//         toast.error('Sorry, something went wrong. Please, try again');
//         this.setState({
//           status: Status.IDLE,
//         });
//       } finally {
//         this.setState({
//           isLoading: false,
//         });
//       }
//     }
//   }

//   render() {
//     const { status, images, isLoading } = this.state;
//     const { handleCilck } = this.props;

//     return (
//       <>
//         {isLoading && <Loader visible={isLoading} />}

//         {status=== 'resolved' && (
//           <Gallery>
//             {images.map(image => {
//               return <ImageGalleryItem key={image.id} image={image} />;
//             })}
//           </Gallery>
//         )}

//         {/* {isMore && <Button onClick={handleCilck} />} */}

//         <ToastContainer autoClose={2000} theme={ 'dark'} />
//       </>
//     );
//   }
// }

// ImageGallery.propTypes = {
//   query: PropTypes.string.isRequired,
//   page: PropTypes.number.isRequired,
//   handleCilck: PropTypes.func.isRequired,
// };
