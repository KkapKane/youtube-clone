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
          Home
        </div>

        <div id='sideTab'>
          <BsPlayBtnFill /> Shorts
        </div>
        <div id='sideTab'>
          <BsCollectionPlayFill /> Subscriptions
        </div>
      </div>
      <div className='libraryHistory'>
        <div id='sideTab'>
          <MdVideoLibrary /> Library
        </div>
        <div id='sideTab'>
          {" "}
          <BiHistory /> History
        </div>
      </div>
      <div className='explore'>
        <h4> Explore </h4>

        <div id='sideTab'>
          {" "}
          <AiFillFire /> Trending
        </div>
        <div id='sideTab' onClick={() => refreshCategory(10)}>
          <MdMusicNote /> Music
        </div>
        <div id='sideTab'>
          <MdLocalMovies /> Movie & TV
        </div>
        <div id='sideTab'>
          <IoMdWifi /> Live
        </div>
        <div id='sideTab' onClick={() => refreshCategory(20)}>
          {" "}
          <SiYoutubegaming /> Gaming
        </div>
        <div id='sideTab' onClick={() => refreshCategory(25)}>
          {" "}
          <BiNews /> News
        </div>
        <div id='sideTab' onClick={() => refreshCategory(17)}>
          {" "}
          <AiFillTrophy /> Sports
        </div>
        <div id='sideTab'>
          {" "}
          <FaLightbulb /> Learning
        </div>
        <div id='sideTab'>
          <GiClothesline /> Fashion & Beauty
        </div>
        <div id='sideTab'>
          <MdPodcasts /> Podcasts
        </div>
      </div>
      <div className='browseChannel'>
        <div id='sideTab'>
          {" "}
          <BsPlusCircle /> Browse Channels{" "}
        </div>
      </div>

      <div className='moreFromYoutube'>
        <h4>More from Youtube </h4>

        <div id='sideTab'>
          {" "}
          <AiFillYoutube className='icon' size={30} /> Youtube Premium
        </div>
        <div id='sideTab'>
          <SiYoutubemusic className='icon' size={30} /> Youtube Music
        </div>
        <div id='sideTab'>
          {" "}
          <TbMoodKid className='icon' size={30} /> Youtube Kids
        </div>
        <div id='sideTab'>
          {" "}
          <BiTv className='icon' size={30} /> Youtube TV
        </div>
      </div>
      <div className='Settings'>
        <div id='sideTab'>
          <AiFillSetting /> Settings
        </div>
        <div id='sideTab'>
          <AiFillFlag /> Report History
        </div>
        <div id='sideTab'>
          <BsFillQuestionCircleFill /> Help
        </div>
        <div id='sideTab'>
          <MdFeedback /> Send feedback
        </div>
      </div>
    </div>
  );
}
