import React, {useEffect, useState} from "react"
import "../style/watchPage.scss"
import SearchResult from "./searchResult"
import youtube from "../youtube"
import Comment from "./comment"

import ConvertToM from "../functions/kFormatter";
import {FaRegThumbsUp} from 'react-icons/fa'
import {FaRegThumbsDown} from 'react-icons/fa'
import {RiShareForwardLine} from 'react-icons/ri'
import {BiListPlus,BiDotsHorizontalRounded} from 'react-icons/bi'
import axios from "axios";

var moment = require('moment'); // require
export default function WatchPage({setHomePage,selectedVid, setIsSideBar}) {
    const timeAgo = moment(selectedVid.vid.snippet.publishedAt).fromNow();
    const [channelPic, setChannelPic] = useState()
    const [subCount, setSubCount] = useState()
    const [viewCount, setViewCount] = useState()
    const [likeCount,setLikeCount] = useState()
    const [comments, setComments] = useState()
    const [relatedVid,setRelatedVid] = useState({})
    const [loading, setLoading] = useState(false)
    const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const [duration, setDuration] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
      })
    
      async function findRelatedVid(id){
    
         
          const response = await youtube.get("/search", {
            params: {
              id: id,
              maxResults: 16,
              relatedToVideoId: id,
            }
          })
          setRelatedVid(response.data.items)
    
          setLoading(true)
          .catch((error) => console.log(error))
          .finally(() => setLoading(false))
      
        }
      
        async function getComments(id){
    
        try {
          // const response = await axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyAtyd7zyv1IQJM1re_Zrx698rT5bcVu7fg&textFormat=plainText&part=snippet&videoId=${id}&maxResults=5`)
          const response = await youtube.get("/commentThreads", {
            params: {
              videoId: id,
              maxResults: 5,
              textFormat: 'plainText'
            }
          })
          console.log(response)
          setComments(response.data.items)
          console.log('loading')
        }catch(error){
          console.log(error)
        }
      
      
        }
        
      

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
          setLikeCount(response.data.items[0].statistics.likeCount)
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
// checks if url exist in string and wraps it around <a> if so
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
findRelatedVid(selectedVid.id)
console.log(selectedVid)
getComments(selectedVid.vid.id)

},[])
   
    return (
        <div className="watchPage">
            <div className="videoContainer">
            <iframe className="vid" src={`https://www.youtube.com/embed/${selectedVid.vid.id}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>

            </iframe>
            <div className="Title">{selectedVid.vid.snippet.title}</div>
            <div className="channelContainerAndYoutubeOptions">
            <div className="channelInfo">
            <img className="channelLogo" src={channelPic} alt="" />
            <div className="channelNameSubCount">
            <div>{selectedVid.vid.snippet.channelTitle}</div>
            <div>{ConvertToM(subCount)} subscribers</div>
            </div>
            <div className="subscribeBtn">Subscribe</div>
            </div>
            <div className="youtubeOptions">
                <div className="thumbs">
                <div className="thumbsUp"><FaRegThumbsUp size={23} style={{strokeWidth: "30", stroke: "rgb(187, 184, 184)"}}/>{ConvertToM(likeCount)}</div>
                <div className="thumbsDown"><FaRegThumbsDown size={23} style={{strokeWidth: "30", stroke: "rgb(187, 184, 184)"}}/></div>
                </div>
                <div className="share"><RiShareForwardLine size={20}  />Share</div>
                <div className="save"><BiListPlus size={24}/>Save</div>
                <div className="threeDot"><BiDotsHorizontalRounded/></div>
            </div>
            </div>
            <div className="descriptionBox">
                <div className="viewDate">
                <div className="view">{ConvertToM(viewCount)}views</div>•
                <div className="whenMade">{timeAgo}</div>
                </div>
           
                                                                                        
                    <pre className="description">{renderText(selectedVid.vid.snippet.description)}
                    
                    </pre>
                   
                    
            </div>
                    <input className="expand-btn" type="checkbox" />
                    <div className="commentSection">
                    {loading ? comments.map((comment)=>{
              return (
                <Comment comment={comment}/>
                
              )
            }) :null}
            </div>
            </div>
            <div className="relatedVidContainer">
            {loading ? relatedVid.map((z)=>{
            
            return (
              
           <SearchResult vid={z} />
          
            
           
           )
          }) : null}
            </div>
            
        </div>

    )
}