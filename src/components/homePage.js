import React, {useState,useEffect} from "react"
import youtube from "../youtube"
import "../style/homepage.scss"
import SearchResult from "./searchResult"

export default function HomePage({isHomePage, setHomePage, page, loading, getMostPopular, PopularVid, currentCategory, setPopularVid}) {

 




   
useEffect(()=> {

    getMostPopular(currentCategory)
    setHomePage(true)
   
    }, [page])

    



    return (
        <div className="HomePage">
        {!loading ? <div>...loading</div> : <div className="HomePageContent">
            {PopularVid.map((x)=> {
                return (
                    <div className="homepageVid" key={x.id}> 
                    <SearchResult vid={x} isHomePage={isHomePage}/>
                    </div>
                )
            })}
        </div> } 
        </div>
    )
}