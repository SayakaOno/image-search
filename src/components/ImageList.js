import React, { Component } from "react";

class ImageList extends Component {
  renderMoreButton = () => {
    let startNum = this.props.list.length + 1;
    if (startNum > 100) return null;
    return (
      <button
        className="ui orange basic button"
        onClick={() => this.props.onLoadMore(startNum)}
      >
        More
      </button>
    );
  };

  render() {
    if (this.props.list === undefined) {
      return null;
    }
    const items = React.Children.map(this.props.list, (item, index) => {
      return (
        <li key={index}>
          <img src={item} />
        </li>
      );
    });
    return (
      <div className="image-list ui bottom attached active tab segment">
        <i className="fas fa-times-circle" onClick={this.props.onRemove} />
        <div
          className="image-frame"
          // style={{
          //   height:
          //     window.innerHeight -
          //     document.querySelector(".navbar").clientHeight
          // }}
        >
          <div>
            <ul className="ui small images">{items}</ul>
            {this.renderMoreButton()}
          </div>
        </div>
      </div>
    );
  }
}

export default ImageList;
