import React, { Component } from "react";

class Search extends Component {
  state = {};
  render() {
    const { location, term, onChange } = this.props;
    return (
      <div>
        <input
          name="location"
          type="text"
          value={location}
          onChange={onChange}
        />
        <input name="term" type="text" value={term} onChange={onChange} />
        <button>Search</button>
      </div>
    );
  }
}

export default Search;
