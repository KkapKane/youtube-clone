
import React, {useState, useEffect} from "react"
import youtube from "../youtube";
import ConvertToM from "../functions/kFormatter";
var moment = require('moment'); // require


export default function SearchResult({vid}) {
   
const channelLink = 'https://youtube.com/channel/' + vid.id.channelId;
const channelLink2 = 'https://youtube.com/channel/' + vid.snippet.channelId;
const videoLink =  'https://youtube.com/watch?v=' + vid.id.videoId;
const imgSrc = vid.snippet.thumbnails.medium.url;

const timeAgo = moment(vid.snippet.publishedAt).fromNow(); 

const [subCount,setSubCount] = useState()
const [channelPic,setChannelPic] = useState()
const [viewCount,setViewCount] = useState()
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
      console.log(response)
      setChannelPic(response.data.items[0].snippet.thumbnails.default.url)
      
      
      setLoading(false)
    }
     catch (error){
      console.error('error:' + error)
     }
     
    }

    async function ChannelSub (id) {
      try {
        setLoading(true)
        const response = await youtube.get("/channels", {
        params: {
          part: 'statistics',
          id: id,
          maxResults:1,
        }
      })
      
      setSubCount(response.data.items[0].statistics.subscriberCount)
      
      
      setLoading(false)
    }
     catch (error){
      console.error('error:' + error)
     }
     
    }
      
    async function grabVidInfo (id) {
      try {
        setLoading(true)
        const response = await youtube.get("/videos", {
        params: {
          part: 'statistics',
          id: id,
          maxResults:1,
        }
      })
      console.log(response)
      setViewCount(response.data.items[0].statistics.viewCount)
      const response2 = await youtube.get("/videos", {
        params: {
          part:'contentDetails',
          id: id,
          maxResults:1
        }
      })
      console.log(response2)
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
        grabVidInfo(vid.id.videoId)

        console.log(subCount)
        
        }
        else if(vid.id.kind == 'youtube#channel'){
          ChannelSub(vid.snippet.channelId)
        }
      },[])

    return (
      
       <div className="searchResult">
         {!loading ? <div className="test">     
        
         {vid.id.kind =='youtube#channel' ? 
             
             <a href={channelLink}>
      
         <img className="channelImg" src={imgSrc} alt="" />
         </a>
          :
           
          <a href={videoLink}>
          
            <img className="videoImg" src={imgSrc} alt="" />  
        
        </a>}

        
        <div className="videoInfo">
          
        <div className="vidTitle">{vid.snippet.title}</div>
        {vid.id.kind == 'youtube#channel' ? <div className="description">
        <div style={{color:'black'}}>{ConvertToM(subCount)} subscribers</div>
 
        {vid.snippet.description}</div> : null}
        
       
      
      <div className="channelInfo"> 
       
       
      {vid.id.kind == 'youtube#video' ? 
      <div className="videoInfoBox"> 
        <div className="viewDate">
          <div className="view">{ConvertToM(viewCount)} views</div>
          <div className="date">{timeAgo}</div>
        </div>
        <div className="smallChannelInfo">
        {/* smallchannel icon       */}
        <img className="videoChannelImg" src={channelPic} alt="" />
          
        <a href={channelLink2}>{vid.snippet.channelTitle}</a>
        </div>
        <div className="description"> {vid.snippet.description}</div>
        
      </div>: null}
      
      
      </div>

        </div>    
        </div> : null} 
    
        </div> 
    )
}