import { useState } from "react";
import replyicon from "../assets/images/icon-reply.svg";
import editicon from "../assets/images/icon-edit.svg";
import deleteicon from "../assets/images/icon-delete.svg";

const SingleComment = ({ comments, currentUser, onAddReply, onScore }) => {
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  return (
    <>
      {comments?.length > 0 &&
        comments.map((comment) => (
          <div key={comment.id} className="my-4">
            <div className="bg-white my-4 p-4 rounded-xl shadow-sm w-full sm:w-10/12 mx-auto">
              {/* Desktop layout */}
              <div className="hidden sm:flex gap-4">
                {/* Score section */}
                <div className="flex flex-col items-center justify-around bg-neutral-100 rounded-lg px-2 py-1">
                  <button
                    onClick={() => onScore(comment.id, 1)}
                    className="text-primary-200 font-bold text-lg leading-none"
                  >
                    +
                  </button>
                  <span className="text-primary-600 font-semibold">
                    {comment.score}
                  </span>
                  <button
                    onClick={() => onScore(comment.id, -1)}
                    className="text-primary-200 font-bold text-lg leading-none"
                  >
                    −
                  </button>
                </div>

                {/* Comment content */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={comment.user.image.webp}
                        alt={comment.user.username}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-bold text-neutral-800">
                        {comment.user.username}
                      </span>
                      {comment.user.username === currentUser?.username && (
                        <span className="bg-primary-600 text-neutral-50 px-1 rounded-sm py-0.5 text-[14px] font-medium">
                          You
                        </span>
                      )}
                      <span className="text-neutral-500 text-sm font-medium">
                        {comment.createdAt}
                      </span>
                    </div>

                    {/* Actions */}
                    <button
                      onClick={() => setReplyingTo(comment.id)}
                      className="flex items-center gap-1 text-primary-600 font-medium hover:underline"
                    >
                      <img src={replyicon} alt="reply" className="w-4 h-4" />
                      Reply
                    </button>
                  </div>

                  {/* Body */}
                  <p className="text-neutral-500 text-sm leading-relaxed font-medium">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>

            {/* Reply Input */}
            {replyingTo === comment.id && (
              <div className="ml-12 mt-3 flex gap-3">
                <img
                  src={currentUser.image.webp}
                  alt={currentUser.username}
                  className="w-8 h-8 rounded-full"
                />
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Replying to @${comment.user.username}`}
                  className="flex-1 border border-neutral-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows="2"
                />
                <button
                  onClick={() => {
                    onAddReply(comment.id, replyText);
                    setReplyText("");
                    setReplyingTo(null);
                  }}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-500"
                >
                  Reply
                </button>
              </div>
            )}

            {/* Render Replies */}
            {comment.replies?.length > 0 && (
              <div className="ml-6 border-l-2 border-neutral-200 pl-4">
                <SingleComment
                  comments={comment.replies}
                  currentUser={currentUser}
                  onAddReply={onAddReply}
                  onScore={onScore}
                />
              </div>
            )}
          </div>
        ))}
    </>
  );
};

export default SingleComment;
