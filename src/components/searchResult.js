
import React, { useState, useEffect } from "react"
import youtube from "../youtube";
import ConvertToM from "../functions/kFormatter";
const td = require("tinyduration")
var moment = require('moment'); // require


export default function SearchResult({ vid, isHomePage }) {

  const channelLink = isHomePage ? 'https://youtube.com/channel/' + vid.snippet.channelId : 'https://youtube.com/channel/' + vid.id.channelId;
  const channelLink2 = isHomePage ? 'https://youtube.com/channel/' + vid.snippet.channelId : 'https://youtube.com/channel/' + vid.snippet.channelId;
  const videoLink = isHomePage ? 'https://youtube.com/watch?v=' + vid.id : 'https://youtube.com/watch?v=' + vid.id.videoId;
  const videoId = isHomePage ? vid.id : vid.id.videoId;
  const resultType = isHomePage ? vid.kind : vid.id.kind
  const imgSrc = vid.snippet.thumbnails.medium.url;
  const timeAgo = moment(vid.snippet.publishedAt).fromNow();



  const [subCount, setSubCount] = useState()
  const [channelPic, setChannelPic] = useState()
  const [viewCount, setViewCount] = useState()
  const [loading, setLoading] = useState(false)
  

  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })




  async function ChannelImg(id) {
    try {
      setLoading(true)
      const response = await youtube.get("/channels", {
        params: {
          id: id,
          maxResults: 1,
        }
      })

      setChannelPic(response.data.items[0].snippet.thumbnails.default.url)


      setLoading(false)
    }
    catch (error) {
      console.error('error:' + error)
    }

  }

  async function ChannelSub(id) {
    try {
      setLoading(true)
      const response = await youtube.get("/channels", {
        params: {
          part: 'statistics',
          id: id,
          maxResults: 1,
        }
      })

      setSubCount(response.data.items[0].statistics.subscriberCount)


      setLoading(false)
    }
    catch (error) {
      console.error('error:' + error)
    }

  }

  async function grabVidInfo(id) {
    try {
      setLoading(true)
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
      console.log(response2)
      const d = moment.duration(response2.data.items[0].contentDetails.duration)

      setDuration({ ...duration, seconds: d._data.seconds, minutes: d._data.minutes, hours: d._data.hours })


      setLoading(false)

    }
    catch (error) {
      console.error('error:' + error)
    }


  }

  useEffect(() => {


    console.log(vid)
    if (resultType == 'youtube#video') {

      ChannelImg(vid.snippet.channelId)



      grabVidInfo(videoId)


    }

    else if (resultType == 'youtube#channel') {
      ChannelSub(vid.snippet.channelId)
    }
  }, [])




  return (




    <div className="searchResult" style={resultType == 'youtube#channel' ? { borderTop: '1px solid #cccccc', borderBottom: '1px solid #cccccc' } : {}}>



      {!loading ? <div className="test">
        {resultType == 'youtube#channel' ? <a href={channelLink}> <img className="channelImg" src={imgSrc} alt="" /> </a> :

          <div className="thumbnailDuration"><a href={videoLink}>
            <img className="videoImg" src={imgSrc} alt="" />
            {duration.seconds > 10 ? <div className="duration">{duration.minutes}:{duration.seconds} </div> : <div className="duration">{duration.minutes}:0{duration.seconds} </div>}
          </a>
          </div>

        }


        <div className="videoInfo">


          {resultType == 'youtube#video' ? isHomePage ? null : <a href={videoLink}><div className="vidTitle">{vid.snippet.title}</div> </a> :
            <a href={channelLink}><div className="vidTitle">{vid.snippet.title}</div> </a>}
          {resultType == 'youtube#channel' ? <div style={{ fontSize: '.8rem' }} className="description">
            <div style={{ color: 'black' }}>{ConvertToM(subCount)} subscribers</div>

            {vid.snippet.description}</div> : null}



          <div className="channelInfo">



            {isHomePage ? <div className="videoInfoBox">
{/*--------------------------------- homepage things start here-----------------------------------------------------*/}

              <img className="videoChannelImg" src={channelPic} alt="" />
              <div className="channelNameAndInfo">
              <a href={videoLink}><div className="vidTitle">{vid.snippet.title}</div> </a>
                <div className="smallChannelInfo">
                  <a href={channelLink2}>{vid.snippet.channelTitle}</a>
                </div>

                <div className="viewDate">
                  <div className="view">{ConvertToM(viewCount)} views</div>•
                  <div className="date">{timeAgo}</div>
                </div>
              </div>



{/*--------------------------------- searchPage things start here-----------------------------------------------------*/}

              {isHomePage ? null : resultType == 'youtube#video' ? <div className="description"> {vid.snippet.description}</div> : null}

            </div> :

              <div className="videoInfoBox">

                {resultType == 'youtube#video' ? <div className="viewDate">
                  <div className="view">{ConvertToM(viewCount)} views</div>•
                  <div className="date">{timeAgo}</div>
                </div> : null}

                {resultType == 'youtube#video' ? <div className="smallChannelInfo">
                  <img className="videoChannelImg" src={channelPic} alt="" />
                  <a href={channelLink2}>{vid.snippet.channelTitle}</a>
                </div> : null}



                {isHomePage ? null : resultType == 'youtube#video' ? <div className="description"> {vid.snippet.description}</div> : null}

              </div>}


          </div>

        </div>
      </div> : null}

    </div>

  )
}