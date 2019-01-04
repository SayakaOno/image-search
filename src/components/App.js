import React, { Component } from "react";
import Search from "./Search";
import NavBar from "./NavBar";
import ImageList from "./ImageList";
import { google, url } from "../api/google";
import Loader from "./Loader";
import testdata from "../testdata/data";

class App extends Component {
  state = {
    name: "",
    term: "",
    requestedName: "",
    selectedIndex: 0,
    navItems: [],
    imageList: [],
    imageListWidth: 0,
    loading: false
  };

  //for test
  // componentDidMount() {
  //   this.setState(testdata);
  // }
  fixResultComponent() {
    if (document.querySelector(".navbar").getBoundingClientRect().top > 10) {
      document.querySelector(".image-frame").style.overflowY = "hidden";
    } else {
      document.querySelector(".image-frame").style.overflowY = "scroll";
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.fixResultComponent);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.fixResultComponent);
  }

  componentDidUpdate() {
    if (!this.imageListRef.current) {
      return;
    }
    if (this.state.imageListWidth !== this.imageListRef.current.offsetWidth) {
      this.setState({ imageListWidth: this.imageListRef.current.offsetWidth });
    }
  }

  searchButtonRef = React.createRef();
  imageListRef = React.createRef();

  isInputEmpty = () => {
    return !this.state.term;
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    const classNames = "ui yellow button";
    setTimeout(() => {
      this.state.name || this.state.term
        ? (this.searchButtonRef.current.className = classNames)
        : (this.searchButtonRef.current.className = classNames + " disabled");
    }, 0);
  };

  onSearchSubmit = async (start = 1) => {
    this.setState({ loading: true });
    const term = this.state.term;
    try {
      // for load more
      const term = this.state.term
        ? this.state.term
        : this.state.navItems[this.state.selectedIndex];
      const response = await google.get(url, {
        params: {
          searchType: "image",
          q: this.state.name + "+" + term,
          start: start
          //TODO: gl:
        }
      });
      let data = response.data.items;
      let imageList = [];
      let selectedIndex = this.state.selectedIndex;

      if (start === 1) {
        imageList = [];
        data.forEach(item => {
          imageList.push(item.link);
        });
        imageList = [...this.state.imageList, imageList];
        selectedIndex = this.state.imageList.length;
      } else {
        const updatedList = this.state.imageList[
          this.state.selectedIndex
        ].slice();
        data.forEach(item => {
          updatedList.push(item.link);
        });
        imageList = this.state.imageList.map(function(arr) {
          return arr.slice();
        });
        imageList[this.state.selectedIndex] = updatedList;
      }
      this.setState(prevState => {
        let navItems = [...prevState.navItems];
        navItems.push(this.state.term);
        return {
          term: "",
          navItems,
          selectedIndex,
          imageList,
          requestedName: this.state.name,
          loading: false
        };
      });
    } catch (e) {
      this.setState({ loading: false, term: "" });
      setTimeout(
        () =>
          alert(
            `I am sorry but something went wrong... :(\nPlease ask your server what "${term}" is.`
          ),
        100
      );
    }
  };

  handleSubmit = () => {
    if (this.isInputEmpty()) {
      alert("Please enter menu!");
      return;
    }
    const selectedIndex = this.state.navItems.findIndex(
      item => item === this.state.term
    );
    if (selectedIndex !== -1) {
      this.setState({ selectedIndex, term: "" });
      return;
    }

    if (this.state.requestedName !== this.state.name) {
      this.setState({ navItems: [], imageList: [] });
    }
    this.onSearchSubmit();
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
    const selectedIndex = Math.min(
      this.state.navItems.length - 2,
      this.state.selectedIndex
    );
    this.setState(prevState => {
      return {
        navItems: prevState.navItems.filter((item, index) => {
          return this.state.selectedIndex !== index;
        }),
        imageList: prevState.imageList.filter((item, index) => {
          return this.state.selectedIndex !== index;
        }),
        selectedIndex
      };
    });
  };

  renderResultComponents = () => {
    const { navItems, selectedIndex, imageList } = this.state;
    return (
      <React.Fragment>
        <NavBar
          items={navItems}
          onSelect={this.handleSelect}
          selectedIndex={selectedIndex}
          imageListWidth={this.state.imageListWidth}
        />
        {this.state.loading ? (
          <Loader />
        ) : (
          <ImageList
            ref={this.imageListRef}
            list={imageList[selectedIndex]}
            onRemove={this.removeNavItem}
            onLoadMore={this.onSearchSubmit}
          />
        )}
      </React.Fragment>
    );
  };

  render() {
    const { name, term } = this.state;
    return (
      <main>
        <React.StrictMode>
          <Search
            ref={this.searchButtonRef}
            name={name}
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
