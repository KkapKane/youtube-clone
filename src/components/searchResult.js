
import React, {useState} from "react"

export default function SearchResult({vid}) { 
const channelLink = 'https://youtube.com/channel/' + vid.id.channelId;
const videoLink =  'https://youtube.com/watch?v=' + vid.id.videoId;
const imgSrc = vid.snippet.thumbnails.medium.url;    
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
       {vid.id.kind == 'youtube#video' ?  <a href={channelLink}>{vid.snippet.channelTitle}</a> : null}
        {vid.id.kind =='youtube#channel' ? <div >{vid.snippet.description}</div> : null}
        </div>    
        </div> 
    
        </div> 
    )
}