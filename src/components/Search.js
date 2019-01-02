import React from "react";

const Search = React.forwardRef((props, ref) => {
  const { name, term, onChange, onClick, onKeyDown } = props;

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
      <button ref={ref} className="ui yellow button disabled" onClick={onClick}>
        Search
      </button>
    </div>
  );
});

export default Search;
