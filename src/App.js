
import youtube from "./youtube";
import React, {useState, useEffect} from "react";
import { Route, Routes } from "react-router-dom"
import SearchPage from "./components/searchPage";
import HomePage from "./components/homePage";
import SideBar from "./components/sideBar";
import TopBar from "./components/topbar";

function App() {

  const [videoData, setVideoData] = useState({})
  const [loading,setLoading] = useState(false)
  const [isHomePage,setHomePage] = useState(true)
  async function onSearch (keyword) {

   


    const response = await youtube.get("/search", {
    params: {
      q: keyword
    }
  })

  setVideoData({
    videoMetaInfo: response.data.items,
    selectedVideoId: response.data.items[0].id.videoId
  })
  setLoading(true)
   

  .catch((error) => console.log(error))
  .finally(() => setLoading(false))
}



  return (
    <div className="App">


    
    <TopBar onSearch={onSearch}/>
    <SideBar />
    <Routes>
    <Route path="/" element={ <HomePage isHomePage={isHomePage} setHomePage={setHomePage}/>} />
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
