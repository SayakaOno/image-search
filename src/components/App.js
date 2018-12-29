import React, { Component } from "react";
import Search from "./Search";

class App extends Component {
  state = { location: "", term: "" };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { location, term } = this.state;
    return (
      <Search location={location} term={term} onChange={this.handleChange} />
    );
  }
}

export default App;
