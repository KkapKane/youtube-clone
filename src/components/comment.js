import "../style/comment.scss"
import {FaRegThumbsUp} from 'react-icons/fa'
import {FaRegThumbsDown} from 'react-icons/fa'

export default function Comment({comment}) {
    const ProfilePic = comment.snippet.topLevelComment.snippet.authorProfileImageUrl
    const userName = comment.snippet.topLevelComment.snippet.authorDisplayName
    const commentText = comment.snippet.topLevelComment.snippet.textDisplay  
    return (
        <div className="Comment">
            <img src={ProfilePic} alt="" />
            <div className="commentContent">
              <div className="commentHeader">
                <div className="commentUserName">{userName}</div>  
                    <div className="commentDate">3 weeks ago</div>
            
            </div>
            <div className="commentBody">
                <div className="commentContext">{commentText}</div>
                    <div className="commentInteractContainer">
                        <div className="commentLike"><FaRegThumbsUp/></div>
                        <div className="commentDislike"><FaRegThumbsDown/></div>
                        <div className="commentReply">reply</div>
                    </div>
            
                </div>
            </div>
        </div>
    )
}