// src/components/CommentsList.jsx
import data from "../../data.json";
import { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

const CommentsList = () => {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    setComments(data.comments || []);
    setCurrentUser(data.currentUser || null);
  }, []);

  // Add new top-level comment
  const handleAddComment = () => {
    if (!newComment?.trim()) return;
    const newC = {
      id: Date.now(),
      content: newComment.trim(),
      createdAt: "Just now",
      score: 0,
      user: currentUser,
      replies: [],
    };
    setComments((prev) => [...prev, newC]);
    setNewComment("");
  };

  // Add a reply to a comment (works recursively)
  const handleAddReply = (parentId, replyText, replyingToUsername) => {
    if (!replyText?.trim()) return;

    const newReply = {
      id: Date.now(),
      content: replyText.trim(),
      createdAt: "Just now",
      score: 0,
      replyingTo: replyingToUsername || null,
      user: currentUser,
      replies: [],
    };

    const addReplyRec = (items) =>
      items.map((it) => {
        if (it.id === parentId) {
          return { ...it, replies: [...(it.replies || []), newReply] };
        }
        if (it.replies?.length) {
          return { ...it, replies: addReplyRec(it.replies) };
        }
        return it;
      });

    setComments((prev) => addReplyRec(prev));
  };

  // Update score + / -
  const handleScore = (id, delta) => {
    const updateRec = (items) =>
      items.map((it) => {
        if (it.id === id) return { ...it, score: (it.score || 0) + delta };
        if (it.replies?.length)
          return { ...it, replies: updateRec(it.replies) };
        return it;
      });
    setComments((prev) => updateRec(prev));
  };

  // Delete comment or reply (recursively)
  const handleDelete = (id) => {
    const removeRec = (items) =>
      items
        .filter((it) => it.id !== id)
        .map((it) => ({ ...it, replies: removeRec(it.replies || []) }));
    setComments((prev) => removeRec(prev));
  };

  // Edit comment content (recursively)
  const handleEdit = (id, newContent) => {
    const editRec = (items) =>
      items.map((it) => {
        if (it.id === id) return { ...it, content: newContent };
        if (it.replies?.length) return { ...it, replies: editRec(it.replies) };
        return it;
      });
    setComments((prev) => editRec(prev));
  };

  return (
    <div className="w-full mx-auto p-4">
      <SingleComment
        comments={comments}
        currentUser={currentUser}
        onAddReply={handleAddReply}
        onScore={handleScore}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* Global Add Comment Box */}
      {currentUser && (
        <div className="bg-white p-4 rounded-xl shadow-sm w-full sm:w-10/12 mx-auto mt-6 flex sm:flex-row flex-col items-start gap-3 relative">
          <img
            src={currentUser.image?.png || currentUser.image}
            alt={currentUser.username}
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1 relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full border border-neutral-300 rounded-lg p-2 pr-24 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows="3"
            />
            <button
              onClick={handleAddComment}
              className="absolute bottom-2 right-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-500"
            >
              Send now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsList;
