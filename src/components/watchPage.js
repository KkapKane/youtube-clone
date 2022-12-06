import React, {useEffect, useState} from "react"
import "../style/watchPage.scss"
import SearchResult from "./searchResult"
import youtube from "../youtube"
import ConvertToM from "../functions/kFormatter";
var moment = require('moment'); // require
export default function WatchPage({setHomePage,selectedVid, setIsSideBar}) {
    const timeAgo = moment(selectedVid.vid.snippet.publishedAt).fromNow();
    const [channelPic, setChannelPic] = useState()
    const [subCount, setSubCount] = useState()
    const [viewCount, setViewCount] = useState()
    const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const [duration, setDuration] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
      })
    

    async function ChannelImg(id) {
        try {
          const response = await youtube.get("/channels", {
            params: {
              id: id,
              maxResults: 1,
            }
          })
          setChannelPic(response.data.items[0].snippet.thumbnails.default.url)    
        }
        catch (error) {
          console.error('error:' + error)
        } 
      }    
      async function ChannelSub(id) {
        try {
           const response = await youtube.get("/channels", {
            params: {
              part: 'statistics',
              id: id,
              maxResults: 1,
            }
          })
          setSubCount(response.data.items[0].statistics.subscriberCount)     
        }
        catch (error) {
          console.error('error:' + error)
        } 
      }
      async function grabVidInfo(id) {
        try {
           const response = await youtube.get("/videos", {
            params: {
              part: 'statistics',
              id: id,
              maxResults: 1,
            }
          })
          setViewCount(response.data.items[0].statistics.viewCount)
          const response2 = await youtube.get("/videos", {
            params: {
              part: 'contentDetails',
              id: id,
              maxResults: 1
            }
          })   
          const d = moment.duration(response2.data.items[0].contentDetails.duration)
          setDuration({ ...duration, seconds: d._data.seconds, minutes: d._data.minutes, hours: d._data.hours })
          }
        catch (error) {
          console.error('error:' + error)
        }
      }

      const renderText = txt =>
  txt
    .split(" ")
    .map(part =>
      URL_REGEX.test(part) ? <a style={{color:'blue'}} href={part}>{part} </a> : part + " "
    );

useEffect(() => {
setHomePage(false)
setIsSideBar(false)
ChannelImg(selectedVid.vid.snippet.channelId)
ChannelSub(selectedVid.vid.snippet.channelId)
grabVidInfo(selectedVid.vid.id)
console.log(selectedVid)
},[])
   
    return (
        <div className="watchPage">
            <div className="videoContainer">
            <iframe width={560*2} height={315*2} src={`https://www.youtube.com/embed/${selectedVid.vid.id}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>

            </iframe>
            <div className="Title">{selectedVid.vid.snippet.title}</div>
            <div className="channelInfo">
            <img src={channelPic} alt="" />
            <div className="channelNameSubCount">
            <div>{selectedVid.vid.snippet.channelTitle}</div>
            <div>{ConvertToM(subCount)} subscribers</div>
            </div>
            <div className="subscribeBtn">Subscribe</div>
            </div>
            <div className="descriptionBox">
                <div className="viewDate">
                <div className="view">{ConvertToM(viewCount)}views</div>•
                <div className="whenMade">{timeAgo}</div>
                </div>
           
                                                                                        
                    <pre className="description">{renderText(selectedVid.vid.snippet.description)}
                    
                    </pre>
                    {console.log(selectedVid.vid.snippet.description[0])}
                    
            </div>
                    <input className="expand-btn" type="checkbox" />
            </div>
        </div>

    )
}