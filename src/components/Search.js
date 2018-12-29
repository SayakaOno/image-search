import React, { Component } from "react";

class Search extends Component {
  state = {};
  render() {
    const { location, term, onChange, onClick } = this.props;
    return (
      <div>
        <input
          name="location"
          type="text"
          value={location}
          onChange={onChange}
        />
        <input name="term" type="text" value={term} onChange={onChange} />
        <button onClick={onClick}>Search</button>
      </div>
    );
  }
}

export default Search;
