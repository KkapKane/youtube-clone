import axios from 'axios'

const key = "AIzaSyD1hOCyK0bAYWJl0oClCp1fEduYrk4RZxY"

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params:{
        part: 'snippet',
        maxResults:10,
        key: key 
    },
    headers:{}
})