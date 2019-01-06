import React from "react";

const Search = ({ name, term, onChange, onKeyDown }) => {
  return (
    <div className="ui input search">
      <input
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
};

export default Search;
