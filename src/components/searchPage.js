import SearchResult from "./searchResult"
import '../style/searchPage.scss'
import youtube from "../youtube";
import React, {useState, useEffect} from "react";

export default function SearchPage({loading, videoData}) { 

    

    return (
        <div className="searchPage">SEARCH PAGE

        {loading ? videoData.videoMetaInfo.map((vid)=>{
            
            return (
                
           <SearchResult vid={vid} key={vid.id.videoId}/>
            
           
           )
          }) : null}
          </div>
    )
}