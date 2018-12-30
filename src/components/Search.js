import React, { Component } from "react";

const Search = props => {
  const { location, term, onChange, onClick } = props;
  return (
    <div className="ui input search">
      <input name="location" type="text" value={location} onChange={onChange} />
      <input name="term" type="text" value={term} onChange={onChange} />
      <button className="ui yellow button" onClick={onClick}>
        Search
      </button>
    </div>
  );
};

export default Search;
