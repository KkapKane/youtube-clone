import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';


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
        <div>
        <form onSubmit={onSubmit}>
        <input onChange={onSearchChange} id="video-Search" type="text" placeholder="Search"/>
        </form>
        </div>
    )
}

export default Search;