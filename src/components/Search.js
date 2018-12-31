import React, { Component } from "react";

const Search = props => {
  const { location, term, onChange, onClick, onKeyDown } = props;
  return (
    <div className="ui input search">
      <input
        name="location"
        type="text"
        value={location}
        onChange={onChange}
        placeholder="location"
      />
      <input
        name="term"
        type="text"
        value={term}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="menu"
      />
      <button className="ui yellow button" onClick={onClick}>
        Search
      </button>
    </div>
  );
};

export default Search;
