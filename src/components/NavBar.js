import React, { Component } from "react";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = { ulWidth: 0, imageListWidth: 0 };
    this.ulRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ imageListWidth: this.props.imageListWidth });
  }

  componentDidUpdate() {
    if (!this.ulRef.current || !this.props.imageListWidth) {
      return;
    }
    if (this.state.imageListWidth !== this.props.imageListWidth) {
      this.setState({ imageListWidth: this.props.imageListWidth });
    }
    const lis = document.querySelectorAll(".navbar li");
    const ulWidth = this.getItemsWidth(lis);
    if (this.state.ulWidth !== ulWidth) {
      this.setState(() => {
        return { ulWidth };
      });
    }
    this.ulRef.current.style.width = this.getUlWidth(ulWidth) + "px";
    if (!lis[this.props.selectedIndex] || this.props.imageListWidth === 0) {
      return;
    }
    const scrollLeft =
      this.getItemsWidth(lis, this.props.selectedIndex + 1) -
      this.props.imageListWidth +
      30;
    if (scrollLeft > 0) {
      setTimeout(() => {
        document.querySelector(".navbar-container").scrollLeft = scrollLeft;
      }, 0);
    }
  }

  getItemsWidth = (arrayLike, length = arrayLike.length) => {
    const listItemArray = Array.from(arrayLike);
    listItemArray.length = length;
    const itemsWidth = listItemArray.reduce(
      (sum, current) => sum + current.offsetWidth,
      0
    );
    return itemsWidth;
  };

  getUlWidth(ulWidth = this.state.ulWidth) {
    return Math.max(this.props.imageListWidth, ulWidth + 25);
  }

  renderItems = () => {
    return this.props.images.map((item, index) => {
      let active = index === this.props.selectedIndex ? " active" : "";
      return (
        <li className={"item" + active} key={item[0].term}>
          {item[0].term}
        </li>
      );
    });
  };

  onNavClick = e => {
    if (e.target.tagName !== "LI") return;
    this.props.onSelect(e.target.innerHTML);
    this.handleScroll(e.target);
  };

  handleScroll = selectedNav => {
    let listItems = document.querySelectorAll(".navbar li");
    if (
      document.querySelector(".navbar-container").getBoundingClientRect().left >
      selectedNav.getBoundingClientRect().left
    ) {
      document.querySelector(".navbar-container").scrollLeft =
        this.getItemsWidth(
          listItems,
          [].slice.call(listItems).indexOf(selectedNav)
        ) - 20;
    }
  };

  render() {
    return this.props.images.length === 0 ? null : (
      <div className="navbar">
        <div className="navbar-container">
          <ul
            ref={this.ulRef}
            className="ui top tabular menu"
            onClick={this.onNavClick}
          >
            {this.renderItems()}
          </ul>
        </div>
      </div>
    );
  }
}

export default NavBar;
