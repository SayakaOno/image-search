import React from "react";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { spans: 0 };

    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.setSpans);
    window.addEventListener("resize", this.setSpans);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setSpans);
  }

  setSpans = () => {
    try {
      const height = this.imageRef.current.clientHeight;

      const spans = Math.ceil(height / 10);

      this.setState({ spans });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { title, link } = this.props.image;

    return (
      <li style={{ gridRowEnd: `span ${this.state.spans}` }}>
        <img ref={this.imageRef} alt={title} src={link} />
      </li>
    );
  }
}

export default ImageCard;
