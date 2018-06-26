import axios from 'axios';
import {FETCH_IMAGE_VIEW} from './types'
const imageURL = 'http://weyveed.herokuapp.com/test/images';

export const fetchImageSuccess = image_view => {
  return {
    type: FETCH_IMAGE_VIEW,
    image_view
  }
};

export default function fetchImages() {
  return async (dispatch) => {
    try{
      const images = await axios.get(imageURL);
      dispatch(fetchImageSuccess(images.data))
    } catch (err) {
      return err
    }
  }
}