import React, { Component } from "react";

class NavBar extends Component {
  renderItems = () => {
    if (this.props.items.length === 0) return;
    return React.Children.map(this.props.items, item => {
      return <li>{item}</li>;
    });
  };

  onNavClick = e => {
    if (e.target.tagName !== "LI") return;
    this.props.onSelect(e.target.innerHTML);
  };

  render() {
    return <ul onClick={e => this.onNavClick(e)}>{this.renderItems()}</ul>;
  }
}

export default NavBar;
