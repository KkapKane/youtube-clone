import Search from "./search";
import '../style/topbar.scss'
import {GiHamburgerMenu} from 'react-icons/gi'
import {SiYoutube} from 'react-icons/si'

export default function TopBar({onSearch}) {
    return (
        <div className="topBar">
            <div className="hamburgerLogo">
            <GiHamburgerMenu size={25} className="hamburger"/>
            <SiYoutube size={40} color='red'/>
            </div>
            <Search onSearch={onSearch}/>
        </div>
    )
}