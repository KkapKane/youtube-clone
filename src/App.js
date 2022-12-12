import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./components/searchPage";
import HomePage from "./components/homePage";
import SideBar from "./components/sideBar";
import TopBar from "./components/topbar";
import CategoryBar from "./components/categoryBar";
import WatchPage from "./components/watchPage";
import { useNavigate } from "react-router-dom";
import api from "./youtube";
import axios from "axios";

import Settings from "./components/settings";

function App() {
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isHomePage, setHomePage] = useState(true);
  const [isWatchPage, setIsWatchPage] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [PopularVid, setPopularVid] = useState([]);
  const [NPT, setNPT] = useState();
  const [page, setPage] = useState(1);
  const [isSideBar, setIsSideBar] = useState(true);
  const [selectedVid, setSelectedVid] = useState({});
  const [apiKey, setApiKey] = useState();
  const [dbId, setDbId] = useState();
  const [selectedVidId, setSelectedVidId] = useState();

  const [isSetting, setIsSetting] = useState(false);

  async function updateApi(id, newKey) {
    const response = await axios.patch(
      `https://fair-teal-brown-bear.cyclic.app/${id}`,
      {
        key: newKey,
      }
    );
  }
  window.onpopstate = () => {
    navigate("/");
  };
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.keyCode === 119) {
        setIsSetting((prevSet) => !prevSet);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleToggle = () => {
    setIsSideBar(!isSideBar);
  };

  const NavToWatchPage = (vid, videoId) => {
    navigate("/watchPage");
    setSelectedVid({ vid });
    setSelectedVidId({ videoId });

    console.log({ selectedVid });
  };

  async function onSearch(keyword) {
    setLoading(true);
    const response = await api.get("/search", {
      params: {
        key: apiKey,
        q: keyword,
      },
    });

    setVideoData(response.data.items);

    setLoading(false);
  }

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.scrollingElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };
  async function getApi() {
    const response = await axios.get(
      "https://fair-teal-brown-bear.cyclic.app/posts"
    );
    setApiKey(response.data[0].key);

    setDbId(response.data[0]._id);

    setLoading(false);
  }

  useEffect(() => {
    getApi();
    window.addEventListener("scroll", handleScroll);
  }, []);

  //--Refresh the home page with the new category selected from category Bar

  async function refreshCategory(category) {
    const response = await api.get("/videos", {
      params: {
        key: apiKey,
        chart: "mostPopular",
        maxResults: 16,
        videoCategoryId: category,
      },
    });
    setCurrentCategory(category);
    setPopularVid(response.data.items);
  }

  // grabs the most popular video in the default category of 0/ALL
  async function getMostPopular(category) {
    const datkey = await axios.get(
      "https://fair-teal-brown-bear.cyclic.app/posts"
    );

    const result = await api.get("/videos", {
      params: {
        key: datkey.data[0].key,
        chart: "mostPopular",
        maxResults: 16,
        pageToken: NPT,
        videoCategoryId: category,
      },
    });

    setNPT(result.data.nextPageToken);
    setPopularVid((prev) => [...prev, ...result.data.items]);

    setLoading(false);
  }

  return (
    <div className='App'>
      <Settings
        isSetting={isSetting}
        dbId={dbId}
        updateApi={updateApi}
        setIsSetting={setIsSetting}
      />
      <TopBar
        onSearch={onSearch}
        handleToggle={handleToggle}
        refreshCategory={refreshCategory}
        setHomePage={setHomePage}
      />
      {isHomePage ? <CategoryBar refreshCategory={refreshCategory} /> : null}
      <SideBar refreshCategory={refreshCategory} isSideBar={isSideBar} />
      <Routes>
        <Route
          path='/'
          element={
            <HomePage
              isHomePage={isHomePage}
              setHomePage={setHomePage}
              setIsSideBar={setIsSideBar}
              currentCategory={currentCategory}
              setPopularVid={setPopularVid}
              getApi={getApi}
              getMostPopular={getMostPopular}
              NavToWatchPage={NavToWatchPage}
              PopularVid={PopularVid}
              page={page}
              apiKey={apiKey}
              loading={loading}
            />
          }
        />

        <Route
          path='/searchPage'
          element={
            <SearchPage
              videoData={videoData}
              apiKey={apiKey}
              loading={loading}
              isHomePage={isHomePage}
              setHomePage={setHomePage}
              NavToWatchPage={NavToWatchPage}
            />
          }
        />

        <Route
          path='/watchPage'
          element={
            <WatchPage
              isWatchPage={isWatchPage}
              setIsWatchPage={setIsWatchPage}
              setIsSideBar={setIsSideBar}
              apiKey={apiKey}
              selectedVidId={selectedVidId}
              isHomePage={isHomePage}
              NavToWatchPage={NavToWatchPage}
              setHomePage={setHomePage}
              selectedVid={selectedVid}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
