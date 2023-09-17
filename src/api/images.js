import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38612355-8184a077488cb30f59b3deec8';

export const getAllImages = async (searchItem, page) => {
  const { data } = await axios(
    `?q=${searchItem}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
