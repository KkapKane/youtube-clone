import SearchResult from "../searchResult"


export default function SearchPage({loading, videoData}) { 
    return (
        <div>SEARCH PAGE

        {loading ? videoData.videoMetaInfo.map((vid)=>{
            return (
           <SearchResult vid={vid} key={vid.id.videoId}/>
            )
          }) : null}
          </div>
    )
}