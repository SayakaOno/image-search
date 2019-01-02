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
    return this.props.items.length === 0 ? null : (
      <div className="navbar">
        <div className="navbar-container">
          <ul className="ui top tabular menu" onClick={this.onNavClick}>
            {this.renderItems()}
          </ul>
        </div>
      </div>
    );
  }
}

export default NavBar;
