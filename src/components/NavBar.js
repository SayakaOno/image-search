import React, { Component } from "react";

class NavBar extends Component {
  renderItems = () => {
    return React.Children.map(this.props.items, (item, index) => {
      let active = index === this.props.selectedIndex ? " active" : "";
      return <li className={"item" + active}>{item}</li>;
    });
  };

  onNavClick = e => {
    if (e.target.tagName !== "LI") return;
    this.props.onSelect(e.target.innerHTML);
  };

  render() {
    return (
      <ul
        className="ui top attached tabular menu"
        onClick={e => this.onNavClick(e)}
      >
        {this.renderItems()}
      </ul>
    );
  }
}

export default NavBar;
