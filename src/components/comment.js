import "../style/comment.scss";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import youtube from "../youtube";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import React, { useState, useEffect } from "react";
var moment = require("moment");

export default function Comment({ comment, apiKey, selectedVid }) {
  const ProfilePic =
    comment.kind == "youtube#commentThread"
      ? comment.snippet.topLevelComment.snippet.authorProfileImageUrl
      : comment.snippet.authorProfileImageUrl;
  const userName =
    comment.kind == "youtube#commentThread"
      ? comment.snippet.topLevelComment.snippet.authorDisplayName
      : comment.snippet.authorDisplayName;
  const commentText =
    comment.kind == "youtube#commentThread"
      ? comment.snippet.topLevelComment.snippet.textDisplay
      : comment.snippet.textDisplay;
  const commentLikes =
    comment.kind == "youtube#commentThread"
      ? comment.snippet.topLevelComment.snippet.likeCount
      : comment.snippet.likeCount;
  const commentReplyCount =
    comment.snippet.totalReplyCount == undefined
      ? 0
      : comment.snippet.totalReplyCount;
  const commentDate =
    comment.kind == "youtube#commentThread"
      ? comment.snippet.topLevelComment.snippet.publishedAt
      : comment.snippet.publishedAt;
  const [showThread, setShowThread] = useState(false);
  const [replies, setReplies] = useState(undefined);
  const [loaded, setLoaded] = useState(false);

  async function getReplies(id) {
    try {
      const response = await youtube.get("/comments", {
        params: {
          part: "snippet",
          key: apiKey,
          parentId: id,
          maxResults: 10,
        },
      });
      setReplies(response.data.items);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (commentReplyCount > 0) {
      getReplies(comment.id, () => {
        setLoaded(true);
      });
    }
  }, [comment]);

  return (
    <div className='Comment'>
      <img src={ProfilePic} alt='' />
      <div className='commentContent'>
        <div className='commentHeader'>
          <div className='commentUserName'>{userName}</div>
          <div className='commentDate'>{moment(commentDate).fromNow()}</div>
        </div>
        <div className='commentBody'>
          <div className='commentContext'>{commentText}</div>
          <div className='commentInteractContainer'>
            <div className='commentLike'>
              <FaRegThumbsUp className='commentUp' />
              <div className='likeCount'>
                {commentLikes > 0 ? commentLikes : null}
              </div>
            </div>
            <div className='commentDislike'>
              <FaRegThumbsDown className='commentDown' />
            </div>
            <div className='commentReply'>Reply</div>
          </div>
        </div>
        {commentReplyCount > 0 ? (
          <div className='replies' onClick={() => setShowThread(!showThread)}>
            {showThread ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
            {commentReplyCount} replies
            <input className='expand-comment' type='checkbox' />
          </div>
        ) : null}
        {loaded ? (
          <div
            className='thread'
            style={!showThread ? { display: "none" } : { display: "block" }}
          >
            {replies.map((reply) => {
              return (
                <Comment
                  apiKey={apiKey}
                  comment={reply}
                  selectedVid={selectedVid}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
