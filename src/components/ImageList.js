import React, { Component } from "react";

class ImageList extends Component {
  render() {
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
    return (
      <div className="ui bottom attached active tab segment">
        <ul>{items}</ul>
      </div>
    );
  }
}

export default ImageList;
