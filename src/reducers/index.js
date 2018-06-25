import {combineReducers} from 'redux'
import images from './reducer_image';

export default combineReducers({
  image_view: images
});
