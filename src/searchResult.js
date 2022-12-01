

export default function SearchResult({vid}) { 
    return (
        <div >
             
        {console.log(vid)}
        <h1>{vid.snippet.channelTitle}</h1>
        <h5>{vid.snippet.title}</h5>
        <a href={`https://youtube.com/watch?v=${vid.id.videoId}`}>test</a>
        <img src={vid.snippet.thumbnails.medium.url} alt="" />
        {/* <iframe src={`https://youtube.com/embed/${vid.id.videoId}`} frameborder="0">TEST!</iframe> */}
        
    
        </div>
    )
}