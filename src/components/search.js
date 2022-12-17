import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

function Search({ onSearch }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [active, setActive] = useState(false)

  const onSearchChange = (event) => {
    setTitle(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onSearch(title);
    navigate("/searchPage");
  };

  const makeActive = () => {
    if(window.innerWidth < 900){
    setActive(!active)
    }
  }
  
  let searchClass = !active ? 'active' : ''

  return (
    <div className='Search'>
      <form onSubmit={title.length > 0 ? onSubmit : makeActive}>
        <input
          onChange={onSearchChange}
        
          className={['video-Search', `${searchClass}` ].join(' ')}
          type='text'
          placeholder='Search'
        />
        <div
          onClick={title.length > 0 ? onSubmit : makeActive}
          className='searchIcon'
        >
          <AiOutlineSearch size={25} />
        </div>
      </form>
    </div>
  );
}

export default Search;
