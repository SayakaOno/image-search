import React, { Component } from "react";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = { ulWidth: 0, itemCount: 0 };
    this.ulRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ itemCount: this.props.items.length });
  }

  componentDidUpdate() {
    if (this.state.ulWidth || !this.ulRef.current) {
      return;
    }
    this.ulRef.current.style.width = this.getUlWidth();
    if (this.state.itemCount !== this.props.items.length) {
      this.setState({ itemCount: this.props.items.length });
    } else {
      return;
    }
    const lis = document.querySelectorAll(".navbar li");
    const ulWidth = this.getItemsWidth(lis);
    if (this.state.ulWidth !== ulWidth) {
      this.setState(() => {
        return { ulWidth };
      });
    }
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

  getUlWidth() {
    return Math.max(this.props.imageListWidth, this.state.ulWidth + 20);
  }

  renderItems = () => {
    return React.Children.map(this.props.items, (item, index) => {
      let active = index === this.props.selectedIndex ? " active" : "";
      return <li className={"item" + active}>{item}</li>;
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
    return this.props.items.length === 0 ? null : (
      <div className="navbar">
        <div className="navbar-container">
          <ul
            ref={this.ulRef}
            className="ui top tabular menu"
            onClick={this.onNavClick}
            style={{
              width: this.getUlWidth()
            }}
          >
            {this.renderItems()}
          </ul>
        </div>
      </div>
    );
  }
}

export default NavBar;
