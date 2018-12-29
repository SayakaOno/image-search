import React, { Component } from "react";
import Search from "./Search";
import NavBar from "./NavBar";
import ImageList from "./ImageList";

class App extends Component {
  state = { location: "", term: "", selected: "", navItems: [] };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onButtonClick = () => {
    // api request
    this.setState(prevState => {
      let navItems = [...prevState.navItems];
      navItems.push(this.state.term);
      return {
        term: "",
        navItems: navItems
      };
    });
  };

  handleSelect = item => {
    this.setState({ selected: item });
  };

  render() {
    const { location, term, navItems } = this.state;
    return (
      <React.Fragment>
        <React.StrictMode>
          <Search
            location={location}
            term={term}
            onChange={this.handleChange}
            onClick={this.onButtonClick}
          />
          <NavBar items={navItems} onSelect={this.handleSelect} />
          <ImageList />
        </React.StrictMode>
      </React.Fragment>
    );
  }
}

export default App;
