
import youtube from "./youtube";
import React, {useState, useEffect} from "react";
import { Route, Routes } from "react-router-dom"
import SearchPage from "./components/searchPage";
import HomePage from "./components/homePage";
import SideBar from "./components/sideBar";
import TopBar from "./components/topbar";
import CategoryBar from "./components/categoryBar";

function App() {

  const [videoData, setVideoData] = useState([])
  const [loading,setLoading] = useState(false)
  const [isHomePage,setHomePage] = useState(true)
  const [currentCategory, setCurrentCategory] = useState(0)
  const [PopularVid,setPopularVid] = useState([])
  const [NPT,setNPT] = useState()
  const [page,setPage] = useState(1)

  async function onSearch (keyword) {

    const response = await youtube.get("/search", {
    params: {
      q: keyword
    }
  })

  setVideoData(response.data.items)
  setLoading(true)
   

  .catch((error) => console.log(error))
  .finally(() => setLoading(false))
}




const handleScroll = () => {
    if(window.innerHeight + document.documentElement.scrollTop  === document.scrollingElement.scrollHeight){
        setPage((prev) => prev +  1)
      
    }
    
}
useEffect(()=>{
    window.addEventListener("scroll", handleScroll);
   
},[])

async function refreshCategory(category) {
  const response = await youtube.get("/videos", {
    params: {
      chart: "mostPopular",
      maxResults: 16,
  
      videoCategoryId: category,
    }
  })
  setCurrentCategory(category)
  setPopularVid(response.data.items)
   
  setLoading(true)
  .catch((error) => console.log(error))
  .finally(() => setLoading(false))
}


async function getMostPopular(category){

    const result = await youtube.get("/videos", {
        params:{
            chart: "mostPopular",
            maxResults: 16,
            pageToken: NPT,
            videoCategoryId: category,
        }
    })
    console.log(result)
    setNPT(result.data.nextPageToken)
    setPopularVid((prev) => [...prev, ...result.data.items])

    
    setLoading(true)
    .catch((error) => console.log(error))
    .finally(() => setLoading(false))
}

function changeCategory (category) {
  setCurrentCategory(category)
}


  return (
    <div className="App">


    
    <TopBar onSearch={onSearch}/>
    <CategoryBar getMostPopular={getMostPopular} refreshCategory={refreshCategory}/>
    <SideBar />
    <Routes>
    <Route path="/" element={ <HomePage 
    isHomePage={isHomePage} 
    setHomePage={setHomePage}
    currentCategory={currentCategory}
    setPopularVid={setPopularVid} 
    getMostPopular={getMostPopular} 
    PopularVid={PopularVid}
    page={page} 
    loading={loading} />} />

    <Route path="/searchPage" element={<SearchPage 
    videoData={videoData} 
    loading={loading} 
    isHomePage={isHomePage} 
    setHomePage={setHomePage}/>} />
    </Routes>
    
    </div>
  );
}

export default App;
