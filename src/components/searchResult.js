
import React, {useState, useEffect} from "react"
import youtube from "../youtube";

export default function SearchResult({vid}) { 
const channelLink = 'https://youtube.com/channel/' + vid.id.channelId;
const videoLink =  'https://youtube.com/watch?v=' + vid.id.videoId;
const imgSrc = vid.snippet.thumbnails.medium.url;

const [channelPic,setChannelPic] = useState()
const [loading,setLoading] = useState(false)

    async function ChannelImg (id) {
      try {
        setLoading(true)
        const response = await youtube.get("/channels", {
        params: {
          id: id,
          maxResults:1,
        }
      })
      setChannelPic(response.data.items[0].snippet.thumbnails.default.url)
      
      
      setLoading(false)
    }
     catch (error){
      console.error('error:' + error)
     }
     
    
      }
      
      useEffect(()=>{
        
        if(vid.id.kind == 'youtube#video'){
        // console.log(vid.snippet.channelId)
        ChannelImg(vid.snippet.channelId)
        
        
        }
      },[])

    return (
      
       <div className="searchResult">
         <div className="test">     
      
         {vid.id.kind =='youtube#channel' ? 
         
         <a href={channelLink}>
          
         <img className="channelImg" src={imgSrc} alt="" />
         </a>
          : 
          <a href={videoLink}>
            <img className="videoImg" src={imgSrc} alt="" />  
        </a>}

  
        <div className="videoInfo">
        <div className="description">{vid.snippet.title}</div>
        {vid.id.kind =='youtube#channel' ? <div >{vid.snippet.description}</div> : null}

      <div className="channelInfo"> 
      {loading ?  <div>...loading</div> :  <img className="videoChannelImg" src={channelPic} alt="" />}
      {vid.id.kind == 'youtube#video' ?  <a href={channelLink}>{vid.snippet.channelTitle}</a> : null}
      </div>

        </div>    
        </div> 
    
        </div> 
    )
}