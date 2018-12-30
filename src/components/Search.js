import React, { Component } from "react";

const Search = React.forwardRef((props, ref) => {
  const { location, term, onChange, onClick } = props;
  return (
    <div className="ui input search">
      <input name="location" type="text" value={location} onChange={onChange} />
      <input name="term" type="text" value={term} onChange={onChange} />
      <button
        ref={ref}
        className="ui yellow button"
        onClick={onClick}
        // disabled={true}
      >
        Search
      </button>
    </div>
  );
});

export default Search;
