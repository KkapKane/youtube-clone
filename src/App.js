import Search from "./components/search";
import youtube from "./youtube";
import React, {useState} from "react";


function App() {

  const [videoData, setVideoData] = useState({})

  async function onSearch (keyword) {
    const response = await youtube.get("/search", {
    params: {
      q: keyword
    }
  })
  console.log(response)
  setVideoData({
    videoMetaInfo: response.data.items,
    selectedVideoId: response.data.items[0].id.videoId
  })

}
  return (
    <div className="App">
      
    <Search onSearch={onSearch}/>
    </div>
  );
}

export default App;
