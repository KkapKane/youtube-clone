import React, {useState,useEffect} from "react"
import youtube from "../youtube"
import "../style/homepage.scss"
import SearchResult from "./searchResult"

export default function HomePage({isHomePage, setHomePage}) {

    const [PopularVid,setPopularVid] = useState({})
    const [loading,setLoading] = useState(false)
    
useEffect(()=> {

    getMostPopular()
    setHomePage(true)
    
    }, [])
    
    async function getMostPopular(){

        const result = await youtube.get("/videos", {
            params:{
                chart: "mostPopular",
                maxResults: 8,
            }
        })
     
        setPopularVid({videoMetaInfo: result.data.items})
      
        setLoading(true)
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    }





    return (
        <div className="HomePage">
        {!loading ? <div>...loading</div> : <div className="HomePageContent">
            {PopularVid.videoMetaInfo.map((x)=> {
                return (
                    <div className="homepageVid"> 
                    <SearchResult vid={x} isHomePage={isHomePage}/>
                    </div>
                )
            })}
        </div> } 
        </div>
    )
}