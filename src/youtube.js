import axios from 'axios'

const key = "AIzaSyCXvu3iRhC-mW788bsYCophNhOUkgC-GrE"

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params:{
        part: 'snippet',
        maxResults:10,
        key: key 
    },
    headers:{}
})