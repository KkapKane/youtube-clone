import React, {useState,useEffect} from "react"
import youtube from "../youtube"
import "../style/homepage.scss"
import SearchResult from "./searchResult"

export default function HomePage({isHomePage, setHomePage}) {

    const [PopularVid,setPopularVid] = useState([])
    const [loading,setLoading] = useState(false)
    const [NPT,setNPT] = useState()
    const [page,setPage] = useState(1)

    const handleScroll = () => {
        if(window.innerHeight + document.documentElement.scrollTop  === document.scrollingElement.scrollHeight){
            setPage((prev) => prev +  1)
           console.log('work')
        }
        
    }
    useEffect(()=>{
        window.addEventListener("scroll", handleScroll);
       
    },[])

   
useEffect(()=> {

    getMostPopular()
    setHomePage(true)
    
    }, [page])
    
    async function getMostPopular(){

        const result = await youtube.get("/videos", {
            params:{
                chart: "mostPopular",
                maxResults: 16,
                pageToken: NPT
            }
        })
        console.log(result)
        setNPT(result.data.nextPageToken)
        setPopularVid((prev) => [...prev, ...result.data.items])
      
        setLoading(true)
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    }
 



    return (
        <div className="HomePage">
        {!loading ? <div>...loading</div> : <div className="HomePageContent">
            {PopularVid.map((x)=> {
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