import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai'

function Search({onSearch}) {

    const navigate = useNavigate();


const [title,setTitle] = useState("")

const onSearchChange = event => {
    
    setTitle(event.target.value)  
    
}



const onSubmit = event => {
    event.preventDefault();
    onSearch(title)
    navigate('/searchPage')
    
}


    return (
        <div className="Search">
        <form onSubmit={onSubmit}>
        <input onChange={onSearchChange} id="video-Search" type="text" placeholder="Search"/>
        <div onClick={onSubmit} className="searchIcon">
        <AiOutlineSearch />
        </div>
        </form>
        
        </div>
    )
}

export default Search;