import axios from 'axios'

const key = "AIzaSyAtyd7zyv1IQJM1re_Zrx698rT5bcVu7fg"

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params:{
        part: 'snippet',
        maxResults:10,
        key: key 
    },
    headers:{}
})