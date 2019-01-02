import React, { Component } from "react";

class NavBar extends Component {
  state = { navbarWidth: 0, itemCount: 0 };

  componentDidMount() {
    this.setState({ itemCount: this.props.items.length });
  }

  componentDidUpdate() {
    if (this.state.itemCount !== this.props.items.length) {
      this.setState(prevState => {
        const listItems = document.querySelectorAll(".navbar li");
        const listItemArray = Array.from(listItems);
        const navbarWidth = listItemArray.reduce(
          (sum, current) => sum + current.offsetWidth,
          0
        );
        return { navbarWidth, itemCount: prevState.itemCount + 1 };
      });
    }
  }

  getNavbarWidth() {}

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
          <ul
            className="ui top tabular menu"
            onClick={this.onNavClick}
            style={{
              width: this.state.navbarWidth + 20
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
