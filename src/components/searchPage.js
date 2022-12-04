import SearchResult from "./searchResult"
import '../style/searchPage.scss'

import React, {useState, useEffect} from "react";

export default function SearchPage({loading, videoData, isHomePage, setHomePage}) { 

    


    useEffect(()=> {
        setHomePage(false)
    }, [])

    return (
        <div className="searchPage">

        {loading ? videoData.map((vid)=>{
            
            return (
                
           <SearchResult vid={vid} key={vid.id.videoId} isHomePage={isHomePage} setHomePage={setHomePage}/>
            
           
           )
          }) : null}
          </div>
    )
}