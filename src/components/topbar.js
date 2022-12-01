import Search from "./search";
import '../style/topbar.scss'

export default function TopBar({onSearch}) {
    return (
        <div className="topBar">
            <Search onSearch={onSearch}/>
        </div>
    )
}