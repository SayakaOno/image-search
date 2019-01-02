import React from "react";

class Loader extends React.Component {
  state = { text: "Loading" };

  componentDidMount() {
    this.loaderId = setInterval(() => {
      this.state.text === "Loading..."
        ? this.setState({ text: "Loading" })
        : this.setState(prevState => {
            return { text: prevState.text + "." };
          });
    }, 300);
  }

  componentWillUnmount() {
    clearInterval(this.loaderId);
  }

  render() {
    return (
      <div
        className="loader-frame ui segment"
        style={{
          height:
            window.innerHeight - document.querySelector(".navbar").clientHeight
        }}
      >
        <div className="ui active inverted dimmer">
          <div className="ui text loader">{this.state.text}</div>
        </div>
      </div>
    );
  }
}

export default Loader;
