import axios from 'axios'
import React, {useEffect, useState} from 'react'







const instance = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
  }); 
  
  instance.interceptors.request.use(config => {
    
    config.params = {
     // add your default ones
     part: 'snippet',
     maxResults: 10,
  
    
     // spread the request's params
      ...config.params,
    };
    return config;
  });
  
  export default instance; 

 
