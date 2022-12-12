import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

function Search({ onSearch }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const onSearchChange = (event) => {
    setTitle(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onSearch(title);
    navigate("/searchPage");
  };
  return (
    <div className='Search'>
      <form onSubmit={title.length > 0 ? onSubmit : null}>
        <input
          onChange={onSearchChange}
          id='video-Search'
          type='text'
          placeholder='Search'
        />
        <div
          onClick={title.length > 0 ? onSubmit : null}
          className='searchIcon'
        >
          <AiOutlineSearch size={25} />
        </div>
      </form>
    </div>
  );
}

export default Search;
