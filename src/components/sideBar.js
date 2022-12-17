import "../style/sidebar.scss";
import {
  AiFillHome,
  AiFillFire,
  AiFillTrophy,
  AiFillYoutube,
  AiFillSetting,
  AiFillFlag,
} from "react-icons/ai";
import {
  BsPlayBtnFill,
  BsCollectionPlayFill,
  BsPlusCircle,
  BsFillQuestionCircleFill,
} from "react-icons/bs";
import {
  MdVideoLibrary,
  MdMusicNote,
  MdLocalMovies,
  MdPodcasts,
  MdFeedback,
} from "react-icons/md";
import { BiHistory, BiNews, BiTv } from "react-icons/bi";
import { IoMdWifi } from "react-icons/io";
import { SiYoutubegaming, SiYoutubemusic } from "react-icons/si";
import { FaLightbulb } from "react-icons/fa";
import { GiClothesline } from "react-icons/gi";
import { TbMoodKid } from "react-icons/tb";

export default function SideBar({ refreshCategory, isSideBar }) {
  return (
    <div className={isSideBar ? "sideBar" : "HideSideBar"}>
      <div className='home'>
        <div id='sideTab'>
          <AiFillHome />
          <span>Home</span>
        </div>

        <div id='sideTab'>
          <BsPlayBtnFill /> <span>Shorts</span>
        </div>
        <div id='sideTab'>
          <BsCollectionPlayFill /> <span>Subscription</span>
        </div>
      </div>
      <div className='libraryHistory'>
        <div id='sideTab'>
          <MdVideoLibrary /> <span>Library</span>
        </div>
        <div id='sideTab'>
          {" "}
          <BiHistory /> <span> History</span>
        </div>
      </div>
      <div className='explore'>
        <span>
        
          <h4> Explore </h4>
        </span>

        <div id='sideTab'>
        
          <AiFillFire /> <span> Trending </span>
        </div>
        <div id='sideTab' onClick={() => refreshCategory(10)}>
          <MdMusicNote /> <span> Music </span>
        </div>
        <div id='sideTab'>
          <MdLocalMovies /> <span> Movie & TV </span>
        </div>
        <div id='sideTab'>
          <IoMdWifi /> <span> Live </span>
        </div>
        <div id='sideTab' onClick={() => refreshCategory(20)}>
      
          <SiYoutubegaming /> <span> Gaming </span>
        </div>
        <div id='sideTab' onClick={() => refreshCategory(25)}>

          <BiNews /> <span> News </span>
        </div>
        <div id='sideTab' onClick={() => refreshCategory(17)}>
   
          <AiFillTrophy /> <span> Sports </span>
        </div>
        <div id='sideTab'>
 
          <FaLightbulb /> <span> Learning </span>
        </div>
        <div id='sideTab'>
          <GiClothesline /> <span> Fashion & Beauty </span>
        </div>
        <div id='sideTab'>
          <MdPodcasts /> <span> Podcasts </span>
        </div>
      </div>
      <div className='browseChannel'>
        <div id='sideTab'>
    
          <BsPlusCircle /> <span> Browse Channels </span>
        </div>
      </div>

      <div className='moreFromYoutube'>
        <h4>More from Youtube </h4>

        <div id='sideTab'>
        
          <AiFillYoutube className='icon' size={30} /> <span> Youtube Premium </span>
        </div>
        <div id='sideTab'>
          <SiYoutubemusic className='icon' size={30} /> <span> Youtube Music </span>
        </div>
        <div id='sideTab'>
          
          <TbMoodKid className='icon' size={30} /> Youtube Kids
        </div>
        <div id='sideTab'>
          
          <BiTv className='icon' size={30} /> Youtube TV
        </div>
      </div>
      <div className='Settings'>
        <div id='sideTab'>
          <AiFillSetting /> <span> Settings</span>
        </div>
        <div id='sideTab'>
          <AiFillFlag /> <span> Report History</span>
        </div>
        <div id='sideTab'>
          <BsFillQuestionCircleFill /> <span> Help</span>
        </div>
        <div id='sideTab'>
          <MdFeedback /> <span> Send feedback</span>
        </div>
      </div>
    </div>
  );
}
