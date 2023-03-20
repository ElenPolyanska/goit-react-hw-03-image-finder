import axios from 'axios';

export const fetchImages = async (value, page) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '32924526-f9591cfa3face167d801f2034';

  const response = await axios.get(
    `${BASE_URL}?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
