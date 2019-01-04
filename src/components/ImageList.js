import React, { Component } from "react";

const ImageList = React.forwardRef((props, ref) => {
  const renderMoreButton = () => {
    let startNum = props.list.length + 1;
    if (startNum > 100) return null;
    return (
      <button
        className="ui orange basic button"
        onClick={() => props.onLoadMore(startNum)}
      >
        More
      </button>
    );
  };

  const items = React.Children.map(props.list, (item, index) => {
    return (
      <li key={index}>
        <img src={item} />
      </li>
    );
  });

  return props.list === undefined ? null : (
    <div
      ref={ref}
      className="image-list ui bottom attached active tab segment"
      style={{
        height: document.documentElement.clientHeight - 50
      }}
    >
      <i className="fas fa-times-circle" onClick={props.onRemove} />
      <div
        className="image-frame"
        style={{
          height: document.documentElement.clientHeight - 90
        }}
      >
        <div>
          <ul className="ui small images">{items}</ul>
          {renderMoreButton()}
        </div>
      </div>
    </div>
  );
});

export default ImageList;
