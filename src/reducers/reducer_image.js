import {FETCH_IMAGE_VIEW} from "../actions/types";

export default (state = [], action) =>{
  switch (action.type) {
    case FETCH_IMAGE_VIEW:
      return action.image_view;
    default:
      return state;
  }
}