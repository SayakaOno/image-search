import React, { Component } from "react";
import Search from "./Search";
import NavBar from "./NavBar";
import ImageList from "./ImageList";

class App extends Component {
  state = {
    location: "",
    term: "",
    selectedIndex: null,
    navItems: [],
    imageList: [["***", "###"]]
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onButtonClick = () => {
    // api request
    const imageList = [];

    this.setState(prevState => {
      let navItems = [...prevState.navItems];
      navItems.push(this.state.term);
      return {
        term: "",
        navItems,
        imageList: [...prevState.imageList, ["a", "b", "c"]]
      };
    });
  };

  handleSelect = item => {
    const index = this.state.navItems.indexOf(item);
    this.setState({ selectedIndex: index });
  };

  getImageList = index => {};

  render() {
    const { location, term, navItems, selectedIndex, imageList } = this.state;
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
          <ImageList list={imageList[selectedIndex]} />
        </React.StrictMode>
      </React.Fragment>
    );
  }
}

export default App;
