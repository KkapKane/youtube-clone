
import youtube from "./youtube";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom"
import SearchPage from "./components/searchPage";
import HomePage from "./components/homePage";
import SideBar from "./components/sideBar";
import TopBar from "./components/topbar";
import CategoryBar from "./components/categoryBar";
import WatchPage from "./components/watchPage";
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();
  const [videoData, setVideoData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isHomePage, setHomePage] = useState(true)
  const [currentCategory, setCurrentCategory] = useState(0)
  const [PopularVid, setPopularVid] = useState([])
  const [NPT, setNPT] = useState()
  const [page, setPage] = useState(1)
  const [isSideBar, setIsSideBar] = useState(true)
  const [selectedVid, setSelectedVid] = useState({})
  
  const handleToggle = () => {
    setIsSideBar(!isSideBar)
  }
  
  
  const NavToWatchPage = (vid) => {
    navigate("/watchPage")
    setSelectedVid({vid})

  }
  
  async function onSearch(keyword) {

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
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.scrollingElement.scrollHeight) {
      setPage((prev) => prev + 1)

    }

  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

  }, [])

  //--Refresh the home page with the new category selected from category Bar

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

  // grabs the most popular video in the default category of 0/ALL
  async function getMostPopular(category) {

    const result = await youtube.get("/videos", {
      params: {
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

  

  return (
    <div className="App">



      <TopBar onSearch={onSearch} handleToggle={handleToggle} />
      {isHomePage ? <CategoryBar getMostPopular={getMostPopular} refreshCategory={refreshCategory} /> : null}
      <SideBar refreshCategory={refreshCategory} isSideBar={isSideBar} />
      <Routes>
        <Route path="/" element={<HomePage
          isHomePage={isHomePage}
          setHomePage={setHomePage}
          setIsSideBar={setIsSideBar}
          currentCategory={currentCategory}
          setPopularVid={setPopularVid}
          getMostPopular={getMostPopular}
          NavToWatchPage={NavToWatchPage}
          PopularVid={PopularVid}
          page={page}
          loading={loading} />} />

        <Route path="/searchPage" element={<SearchPage
          videoData={videoData}
          loading={loading}
          isHomePage={isHomePage}
          setHomePage={setHomePage}
          NavToWatchPage={NavToWatchPage}
        />} />

        <Route path="/watchPage" element={<WatchPage
          setIsSideBar={setIsSideBar}
          setHomePage={setHomePage}
          selectedVid={selectedVid} />} />
      </Routes>

    </div>
  );
}

export default App;