import React, { useEffect } from "react";

import "../style/homepage.scss";
import SearchResult from "./searchResult";

export default function HomePage({
  isHomePage,
  getApi,
  setHomePage,
  page,
  loading,
  getMostPopular,
  apiKey,
  PopularVid,
  currentCategory,
  NavToWatchPage,
  isSideBar,
  setIsSideBar,
}) {
  useEffect(() => {
    
    getApi();
    getMostPopular(currentCategory);
    setHomePage(true);
    setIsSideBar(true);

  }, [page]);

  return (
    <div className='HomePage' style={isSideBar ? {paddingLeft: "10%" } : {paddingLeft: "0%"} }>
      {loading ? (
        <div>...loading</div>
      ) : (
        <div className='HomePageContent' style={isSideBar ? {} : {paddingLeft: "0%"}}>
          {PopularVid.map((x) => {
            return (
              <div className='homepageVid' key={x.id}>
                <SearchResult
                  vid={x}
                  apiKey={apiKey}
                  isHomePage={isHomePage}
                  NavToWatchPage={NavToWatchPage}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
