import axios from 'axios'

const key = "AIzaSyBQa9-4aA3ZukKxVQnzAzVAXsza41syRZA"

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params:{
        part: 'snippet',
        maxResults:10,
        key: key 
    },
    headers:{}
})