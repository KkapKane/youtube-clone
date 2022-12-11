import React, {useState,useEffect} from "react"
import youtube from "../youtube"
import "../style/homepage.scss"
import SearchResult from "./searchResult"
import axios from "axios"



export default function HomePage({isHomePage,getApi, setHomePage, page, loading, getMostPopular, apiKey, PopularVid, currentCategory, NavToWatchPage, setIsSideBar}) {


useEffect(()=> {

    
    getApi()

    getMostPopular(currentCategory)

    setHomePage(true)
    setIsSideBar(true) 
    }, [page])

    return (
        <div className="HomePage">
        {loading ? <div>...loading
          
        </div> : <div className="HomePageContent">
           
            {PopularVid.map((x)=> {
                return (
                    <div className="homepageVid" key={x.id} > 
                    <SearchResult vid={x} apiKey={apiKey} isHomePage={isHomePage}  NavToWatchPage={NavToWatchPage}/>
                    </div>
                )
            })}
        </div> } 
     
        </div>
    )
}