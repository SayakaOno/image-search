import React, { Component } from "react";

const Search = React.forwardRef((props, ref) => {
  const { location, term, onChange, onClick, onKeyDown } = props;
  return (
    <div className="ui input search">
      <input
        name="location"
        type="text"
        value={location}
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
      <button ref={ref} className="ui yellow button disabled" onClick={onClick}>
        Search
      </button>
    </div>
  );
});

export default Search;
