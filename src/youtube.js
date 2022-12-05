import axios from 'axios'

const key = "AIzaSyA-0ICUFcTNs08UpD0FZyXFzPxMMwjRe2k"

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params:{
        part: 'snippet',
        maxResults:10,
        key: key 
    },
    headers:{}
})