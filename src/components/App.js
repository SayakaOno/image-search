import React, { Component } from "react";
import Search from "./Search";
import NavBar from "./NavBar";
import ImageList from "./ImageList";
import { google, url } from "../api/google";
import Loader from "./Loader";

class App extends Component {
  state = {
    location: "",
    term: "",
    selectedIndex: 0,
    navItems: [],
    imageList: [],
    loading: false
  };

  searchButtonRef = React.createRef();

  isInputEmpty = () => {
    return !this.state.term;
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    const classNames = "ui yellow button";
    setTimeout(() => {
      this.state.location || this.state.term
        ? (this.searchButtonRef.current.className = classNames)
        : (this.searchButtonRef.current.className = classNames + " disabled");
    }, 0);
  };

  onSearchSubmit = async (start = 1) => {
    const term = this.state.term
      ? this.state.term
      : this.state.navItems[this.state.selectedIndex];
    const response = await google.get(url, {
      params: {
        searchType: "image",
        q: this.state.location + "+" + term,
        start: start
        //TODO: gl:
      }
    });

    let data = response.data.items;
    if (start === 1) {
      const imageList = [];
      data.forEach(item => {
        imageList.push(item.link);
      });
      this.setState(prevState => {
        return {
          imageList: [...prevState.imageList, imageList],
          selectedIndex: prevState.imageList.length,
          loading: false
        };
      });
    } else {
      this.setState(prevState => {
        const updatedList = prevState.imageList[
          prevState.selectedIndex
        ].slice();
        data.forEach(item => {
          updatedList.push(item.link);
        });
        let imageList = prevState.imageList.map(function(arr) {
          return arr.slice();
        });
        imageList[prevState.selectedIndex] = updatedList;
        return { imageList, loading: false };
      });
    }
  };

  handleSubmit = () => {
    if (this.isInputEmpty()) {
      return false;
    }
    this.setState({ loading: true });
    this.onSearchSubmit();

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
          return this.state.selectedIndex !== index;
        }),
        imageList: prevState.imageList.filter((item, index) => {
          return this.state.selectedIndex !== index;
        })
      };
    });
  };

  renderResultComponents = () => {
    const { navItems, selectedIndex, imageList, location, term } = this.state;
    return (
      <React.Fragment>
        <NavBar
          items={navItems}
          onSelect={this.handleSelect}
          selectedIndex={selectedIndex}
        />
        {this.state.loading ? (
          <Loader />
        ) : (
          <ImageList
            list={imageList[selectedIndex]}
            onRemove={this.removeNavItem}
            onLoadMore={this.onSearchSubmit}
          />
        )}
      </React.Fragment>
    );
  };

  render() {
    const { location, term } = this.state;
    return (
      <main>
        <React.StrictMode>
          <Search
            ref={this.searchButtonRef}
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
