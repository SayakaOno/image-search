import React from "react";

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

  const images = props.images
    ? props.images[0].list.map((image, index) => {
        return (
          <li key={image.title.slice(0, 6) + index}>
            <img src={image.link} alt={image.title} />
          </li>
        );
      })
    : null;

  return props.list === undefined ? null : (
    <div ref={ref} className="image-list ui bottom attached active tab segment">
      <i className="fas fa-times-circle" onClick={props.onRemove} />
      <div className="image-frame">
        <div>
          <ul className="ui small images">{images}</ul>
          {renderMoreButton()}
        </div>
      </div>
    </div>
  );
});

export default ImageList;
