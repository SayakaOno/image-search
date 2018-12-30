import React, { Component } from "react";

class ImageList extends Component {
  state = {};
  render() {
    return (
      <div>
        <p>{this.props.list}</p>
      </div>
    );
  }
}

export default ImageList;
