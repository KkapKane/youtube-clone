import React, {useState, useEffect} from "react";



function Search({onSearch}) {




const [title,setTitle] = useState("")

const onSearchChange = event => {
    
    setTitle(event.target.value)  
    
}

const onSubmit = event => {
    event.preventDefault();
    onSearch(title)
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