import React from "react";
import ImageCard from "./ImageCard";

const ImageList = React.forwardRef((props, ref) => {
  const renderMoreButton = () => {
    let startNum = props.images.length + 1;
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
          <ImageCard
            image={image}
            inedex={index}
            key={image.title.slice(0, 6) + index}
          />
        );
      })
    : null;

  return props.images === undefined ? null : (
    <div ref={ref} className="image-list ui bottom attached active tab segment">
      <i className="fas fa-times-circle" onClick={props.onRemove} />
      <div className="image-frame">
        <div>
          <ul className="ui images image-ul">{images}</ul>
          {renderMoreButton()}
        </div>
      </div>
    </div>
  );
});

export default ImageList;
