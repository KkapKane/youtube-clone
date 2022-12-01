import axios from 'axios'

const key = "AIzaSyBu8pKX6R26Cyyv8UHwhc-jbe7p4VnJ-II"

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params:{
        part: 'snippet',
        maxResults:10,
        key: key 
    },
    headers:{}
})