import SearchResult from "./searchResult"
import '../style/searchPage.scss'

export default function SearchPage({loading, videoData}) { 
    return (
        <div className="searchPage">SEARCH PAGE

        {loading ? videoData.videoMetaInfo.map((vid)=>{
            
            return (
                
           <SearchResult vid={vid} key={vid.id.videoId}/>
            
           
           )
          }) : null}
          </div>
    )
}