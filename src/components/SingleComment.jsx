// src/components/SingleComment.jsx
import { useState } from "react";
import replyicon from "../assets/images/icon-reply.svg";
import editicon from "../assets/images/icon-edit.svg";
import deleteicon from "../assets/images/icon-delete.svg";

const SingleComment = ({
  comments,
  currentUser,
  onAddReply,
  onScore,
  onDelete,
  onEdit,
}) => {
  // which comment id is currently showing the reply input
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  // which comment id is currently being edited
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  if (!comments || comments.length === 0) return null;

  const openReply = (comment) => {
    setReplyingTo(comment.id);
    setReplyText(`@${comment.user.username} `); // prefills with mention
  };

  const submitReply = (parentComment) => {
    const textToSend = replyText.trim();
    if (!textToSend) return;
    onAddReply?.(parentComment.id, textToSend, parentComment.user.username);
    setReplyingTo(null);
    setReplyText("");
  };

  const startEdit = (comment) => {
    setEditingId(comment.id);
    setEditingText(comment.content);
  };

  const saveEdit = (id) => {
    if (!editingText?.trim()) return;
    onEdit?.(id, editingText.trim());
    setEditingId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const confirmDelete = (id) => {
    // simple confirmation; replace with a modal if you prefer
    if (window.confirm("Are you sure you want to delete this comment?")) {
      onDelete?.(id);
    }
  };

  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className="my-4">
          <div className="bg-white my-4 p-4 rounded-xl shadow-sm w-full sm:w-10/12 mx-auto">
            {/* ---------- Desktop layout (>= sm) ---------- */}
            <div className="hidden sm:flex gap-4">
              {/* Score */}
              <div className="flex flex-col items-center justify-around bg-neutral-100 rounded-lg px-2 py-1">
                <button
                  onClick={() => onScore?.(comment.id, 1)}
                  className="text-primary-200 font-bold text-lg leading-none"
                >
                  +
                </button>
                <span className="text-primary-600 font-semibold">
                  {comment.score}
                </span>
                <button
                  onClick={() => onScore?.(comment.id, -1)}
                  className="text-primary-200 font-bold text-lg leading-none"
                >
                  −
                </button>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        comment.user?.image?.png ||
                        comment.user?.image ||
                        `https://avatar.iran.liara.run/public/${
                          (comment.id % 100) + 1
                        }`
                      }
                      alt={comment.user?.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-bold text-neutral-800">
                      {comment.user?.username}
                    </span>
                    {comment.user?.username === currentUser?.username && (
                      <span className="bg-primary-600 text-neutral-50 px-1 rounded-sm py-0.5 text-[14px] font-medium">
                        You
                      </span>
                    )}
                    <span className="text-neutral-500 text-sm font-medium">
                      {comment.createdAt}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {/* If owner -> show Edit/Delete, else Reply */}
                    {comment.user?.username === currentUser?.username ? (
                      <>
                        <button
                          onClick={() => confirmDelete(comment.id)}
                          className="flex items-center gap-1 text-red-500 font-medium hover:underline"
                        >
                          <img
                            src={deleteicon}
                            alt="delete"
                            className="w-4 h-4"
                          />
                          Delete
                        </button>
                        <button
                          onClick={() => startEdit(comment)}
                          className="flex items-center gap-1 text-primary-600 font-medium hover:underline"
                        >
                          <img src={editicon} alt="edit" className="w-4 h-4" />
                          Edit
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => openReply(comment)}
                        className="flex items-center gap-1 text-primary-600 font-medium hover:underline"
                      >
                        <img src={replyicon} alt="reply" className="w-4 h-4" />
                        Reply
                      </button>
                    )}
                  </div>
                </div>

                {/* Body or Edit textarea */}
                {editingId === comment.id ? (
                  <div>
                    <textarea
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      rows="3"
                      className="w-full border border-neutral-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <div className="mt-2 flex gap-2 justify-end">
                      <button
                        onClick={cancelEdit}
                        className="rounded-md bg-neutral-200 px-3 py-1 text-sm font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => saveEdit(comment.id)}
                        className="rounded-md bg-primary-600 px-3 py-1 text-sm font-medium text-white"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-neutral-500 text-sm leading-relaxed font-medium">
                    {comment.replyingTo ? (
                      <span className="text-primary-600 font-medium">
                        @{comment.replyingTo}{" "}
                      </span>
                    ) : null}
                    {comment.content}
                  </p>
                )}
              </div>
            </div>

            {/* ---------- Mobile layout (sm:hidden) ---------- */}
            <div className="flex flex-col gap-3 sm:hidden">
              <div className="flex items-center gap-3">
                <img
                  src={
                    comment.user?.image?.png ||
                    comment.user?.image ||
                    `https://avatar.iran.liara.run/public/${
                      (comment.id % 100) + 1
                    }`
                  }
                  alt={comment.user?.username}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-bold text-neutral-800">
                  {comment.user?.username}
                </span>
                {comment.user?.username === currentUser?.username && (
                  <span className="bg-primary-600 text-neutral-50 px-1 rounded-sm py-0.5 text-[14px] font-medium">
                    You
                  </span>
                )}
                <span className="text-neutral-500 text-sm font-medium">
                  {comment.createdAt}
                </span>
              </div>

              {/* Body or Edit */}
              {editingId === comment.id ? (
                <div>
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    rows="3"
                    className="w-full border border-neutral-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <div className="mt-2 flex gap-2 justify-end">
                    <button
                      onClick={cancelEdit}
                      className="rounded-md bg-neutral-200 px-3 py-1 text-sm font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => saveEdit(comment.id)}
                      className="rounded-md bg-primary-600 px-3 py-1 text-sm font-medium text-white"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-neutral-500 text-sm leading-relaxed font-medium">
                  {comment.replyingTo ? (
                    <span className="text-primary-600 font-medium">
                      @{comment.replyingTo}{" "}
                    </span>
                  ) : null}
                  {comment.content}
                </p>
              )}

              <div className="flex justify-between items-center">
                {/* Score (mobile style) */}
                <div className="flex items-center bg-neutral-100 rounded-lg px-2 py-1">
                  <button
                    onClick={() => onScore?.(comment.id, 1)}
                    className="text-primary-200 font-bold text-lg leading-none"
                  >
                    +
                  </button>
                  <span className="text-primary-600 font-semibold px-2">
                    {comment.score}
                  </span>
                  <button
                    onClick={() => onScore?.(comment.id, -1)}
                    className="text-primary-200 font-bold text-lg leading-none"
                  >
                    −
                  </button>
                </div>

                {/* Actions */}
                <div>
                  {comment.user?.username === currentUser?.username ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => confirmDelete(comment.id)}
                        className="flex items-center gap-1 text-red-500 font-medium hover:underline"
                      >
                        <img
                          src={deleteicon}
                          alt="delete"
                          className="w-4 h-4"
                        />{" "}
                        Delete
                      </button>
                      <button
                        onClick={() => startEdit(comment)}
                        className="flex items-center gap-1 text-primary-600 font-medium hover:underline"
                      >
                        <img src={editicon} alt="edit" className="w-4 h-4" />{" "}
                        Edit
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => openReply(comment)}
                      className="flex items-center gap-1 text-primary-600 font-medium hover:underline"
                    >
                      <img src={replyicon} alt="reply" className="w-4 h-4" />{" "}
                      Reply
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Reply input (rendered below comment, both mobile & desktop) */}
          {replyingTo === comment.id && (
            <div className="ml-12 mt-3 flex gap-3">
              <img
                src={
                  currentUser?.image?.png ||
                  currentUser?.image ||
                  `https://avatar.iran.liara.run/public/20`
                }
                alt={currentUser?.username}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1 relative">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Replying to @${comment.user?.username}`}
                  rows="2"
                  className="w-full border border-neutral-300 rounded-lg p-2 pr-24 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <div className="absolute right-2 bottom-1">
                  <button
                    onClick={() => {
                      submitReply(comment);
                    }}
                    className="bg-primary-600 text-white px-4 py-1 rounded-lg font-medium hover:bg-primary-500"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Replies (nested) */}
          {comment.replies?.length > 0 && (
            <div className="ml-6 border-l-2 border-neutral-200 pl-4">
              <SingleComment
                comments={comment.replies}
                currentUser={currentUser}
                onAddReply={onAddReply}
                onScore={onScore}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default SingleComment;
