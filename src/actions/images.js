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
  return(dispatch) => {
    return axios.get(imageURL).then(images => {
        dispatch(fetchImageSuccess(images.data))
      }
    ).catch(err=>{
        return err
      }
    );
  }
}