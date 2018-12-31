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

  isInputEmpty = () => {
    return !this.state.term;
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

  handleSubmit = () => {
    if (this.isInputEmpty()) {
      return false;
    }
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

  // shouldn't work when Japanese typed
  handleKeyDown = e => {
    if (e.key !== "Enter") {
      return;
    }
    this.handleSubmit();
  };

  removeNavItem = () => {
    this.setState(prevState => {
      return {
        navItems: prevState.navItems.filter((item, index) => {
          console.log("index", index);
          console.log("this.selectedIndex", this.state.selectedIndex);
          return this.state.selectedIndex !== index;
        }),
        imageList: prevState.imageList.filter((item, index) => {
          return this.state.selectedIndex !== index;
        })
      };
    });
  };

  renderResultComponents = () => {
    const { navItems, selectedIndex, imageList } = this.state;
    return imageList.length > 0 ? (
      <React.Fragment>
        <NavBar
          items={navItems}
          onSelect={this.handleSelect}
          selectedIndex={selectedIndex}
        />
        <ImageList
          list={imageList[selectedIndex]}
          onRemove={this.removeNavItem}
        />
      </React.Fragment>
    ) : null;
  };

  render() {
    const { location, term } = this.state;
    return (
      <main>
        <React.StrictMode>
          <Search
            location={location}
            term={term}
            onChange={this.handleChange}
            onClick={this.handleSubmit}
            onKeyDown={this.handleKeyDown}
          />
          {this.renderResultComponents()}
        </React.StrictMode>
      </main>
    );
  }
}

export default App;
