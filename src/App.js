import Search from "./components/search";
import youtube from "./youtube";
import React, {useState} from "react";


function App() {

  const [videoData, setVideoData] = useState({})
  const [loading,setLoading] = useState(false)
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
  setLoading(true)
  console.log(videoData.videoMetaInfo)
  .catch((e)=> console.log(e))
  .finally(() => setLoading(false))
}

var watchLink = 'https://youtube.com/watch?v='

  return (
    <div className="App">
    {loading ? videoData.videoMetaInfo.map((vid)=>{
      return (
        <>
        {console.log(vid)}
        <h1>{vid.snippet.channelTitle}</h1>
        <h5>{vid.snippet.title}</h5>
        <a href={`https://youtube.com/watch?v=${vid.id.videoId}`}>test</a>
        <img src={vid.snippet.thumbnails.default.url} alt="" />
        
    
        </>
      )
    }) : null}
    <Search onSearch={onSearch}/>
    </div>
  );
}

export default App;
