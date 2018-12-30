import React, { Component } from "react";

class ImageList extends Component {
  render() {
    console.log(this.props.list);
    {
      if (!this.props.list) return null;
    }
    const items = React.Children.map(this.props.list, (item, index) => {
      return (
        <li key={index}>
          <img src={item} />
        </li>
      );
    });
    return <ul>{items}</ul>;
  }
}

export default ImageList;
