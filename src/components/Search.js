import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.nameInput = React.createRef();
  }

  componentDidMount() {
    this.nameInput.current.focus();
  }

  render() {
    const { name, term, onChange, onKeyDown } = this.props;
    return (
      <div className="ui input search">
        <input
          ref={this.nameInput}
          name="name"
          type="text"
          value={name}
          onChange={onChange}
          placeholder="restaurant name"
        />
        <input
          name="term"
          type="text"
          value={term}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="menu"
        />
      </div>
    );
  }
}

export default Search;
