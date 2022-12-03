import Search from "./search";
import '../style/topbar.scss'
import { useNavigate } from 'react-router-dom';


import {GiHamburgerMenu} from 'react-icons/gi'
import {SiYoutube} from 'react-icons/si'

export default function TopBar({onSearch}) {
    const navigate = useNavigate();

    return (
        <div className="topBar">
            <div className="hamburgerLogo">
            <GiHamburgerMenu size={25} className="hamburger"/>
            <div onClick={()=>navigate('/')} className="youtubeLogo">
            <SiYoutube size={40} color='red'/> <div>YouTube</div>
            </div>
            </div>
            <Search onSearch={onSearch}/> 
        </div>
    )
}