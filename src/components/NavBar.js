import React, { Component } from "react";

class NavBar extends Component {
  renderItems = () => {
    return React.Children.map(this.props.items, item => {
      return <li className="active item">{item}</li>;
    });
  };

  onNavClick = e => {
    if (e.target.tagName !== "LI") return;
    this.props.onSelect(e.target.innerHTML);
  };

  render() {
    return (
      <div className="navbar">
        <ul
          className="ui top attached tabular menu"
          onClick={e => this.onNavClick(e)}
        >
          {this.renderItems()}
        </ul>
      </div>
    );
  }
}

export default NavBar;
