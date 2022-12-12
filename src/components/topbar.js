import Search from "./search";
import "../style/topbar.scss";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { SiYoutube } from "react-icons/si";

export default function TopBar({
  onSearch,
  handleToggle,
  refreshCategory,
  setHomePage,
}) {
  function goHome() {
    setHomePage(true);
    refreshCategory(0);
    navigate("/");
  }

  const navigate = useNavigate();

  return (
    <div className='topBar'>
      <div className='hamburgerLogo'>
        <RxHamburgerMenu
          size={25}
          className='hamburger'
          onClick={() => handleToggle()}
        />
        <div onClick={() => goHome()} className='youtubeLogo'>
          <SiYoutube size={30} color='red' />{" "}
          <div style={{ fontSize: "1rem" }}>YouTube</div>
        </div>
      </div>
      <Search onSearch={onSearch} />
    </div>
  );
}
