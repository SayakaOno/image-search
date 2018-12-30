import React, { Component } from "react";
import Search from "./Search";
import NavBar from "./NavBar";
import ImageList from "./ImageList";
import { google, url } from "../api/google";

class App extends Component {
  state = {
    location: "",
    term: "",
    selectedIndex: 0,
    navItems: [],
    imageList: []
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSearchSubmit = async (location, term) => {
    const response = await google.get(url, {
      params: {
        searchType: "image",
        q: location + "+" + term
        //TODO: gl:
      }
    });
    let data = response.data.items;
    console.log(data);
    const imageList = [];
    data.forEach(item => {
      imageList.push(item.link);
    });
    this.setState(prevState => {
      return {
        imageList: [...prevState.imageList, imageList],
        selectedIndex: prevState.imageList.length
      };
    });
  };

  onButtonClick = () => {
    this.onSearchSubmit(this.state.location, this.state.term);

    this.setState(prevState => {
      let navItems = [...prevState.navItems];
      navItems.push(this.state.term);
      return {
        term: "",
        navItems
      };
    });
  };

  handleSelect = item => {
    const index = this.state.navItems.indexOf(item);
    this.setState({ selectedIndex: index });
  };

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
