import React from 'react';
import fetchImages from '../actions/images';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import _ from 'lodash';
import ImagePicker from 'react-image-picker';
import 'react-image-picker/dist/index.css';
import PropTypes from 'prop-types';

class ImageViewer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      image: [],
      imageArr:  [],
      showPrev: true,
      showLast: true
    }
  }

  componentWillMount(){
    this.props.fetchImages();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.image_view !== this.props.image_view) {
      this.setState({image_view: nextProps.image_view});
    }
  };

  //last and previous image selected
  lastImageSelected = (element = this.state.image) =>{
    const imageArr = this.state.imageArr;
    imageArr.push(element);
    const lastImg = imageArr[imageArr.length - 1];
    const prevImg = imageArr[imageArr.length - 2];
    const objImg = {
      lastImg,
      prevImg
    };

    if(objImg.prevImg === undefined || null){
      return <p>No Previous Image Yet</p>
    }else{
      this.setState({prevImg: <img src={objImg.prevImg.src} alt="Previous"/>})
    }
    this.setState({lastImg: <img src={objImg.lastImg.src} alt="Last"/>})
  };

  onShowLast =()=> {
    this.setState({showLast: false})
  };

  onShowPrev =()=> {
    this.setState({showPrev: false})
  };

  render(){
    const {image_view} = this.state;
    return(
      <div>
        <ImagePicker
          images={_.map(image_view, (image, i) => ({src: image, value: i}))}
          onPick={this.lastImageSelected}
        />
        <button onClick={this.onShowLast}>Last Image</button>
        <br/>
        <div>
          {this.state.showLast ? null : <div>{this.state.lastImg}</div>}
        </div>
        <br/>
        <button onClick={this.onShowPrev}>Previous Image</button>
        <br/>
        <div>
          {this.state.showPrev ? null : <div>{this.state.prevImg}</div>}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    image_view: state.image_view
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchImages}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageViewer);

ImageViewer.propTypes = {
  image_view: PropTypes.arrayOf(Object),
  image: PropTypes.string,
  showPrev: PropTypes.bool,
  showLast: PropTypes.bool
};