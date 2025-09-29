import data from "../../data.json";
import { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

const CommentsList = () => {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    setComments(data.comments);
    setCurrentUser(data.currentUser);
  }, []);

  // ✅ Add new top-level comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newC = {
      id: Date.now(),
      content: newComment,
      createdAt: "Just now",
      score: 0,
      user: currentUser,
      replies: [],
    };

    setComments([...comments, newC]);
    setNewComment("");
  };

  // ✅ Add reply to specific comment
  const handleAddReply = (parentId, replyText) => {
    if (!replyText.trim()) return;

    const addReply = (items) =>
      items.map((item) => {
        if (item.id === parentId) {
          const newReply = {
            id: Date.now(),
            content: replyText,
            createdAt: "Just now",
            score: 0,
            user: currentUser,
          };
          return { ...item, replies: [...item.replies, newReply] };
        }
        if (item.replies?.length) {
          return { ...item, replies: addReply(item.replies) };
        }
        return item;
      });

    setComments(addReply(comments));
  };

  // ✅ Update score
  const handleScore = (id, delta) => {
    const updateScore = (items) =>
      items.map((item) => {
        if (item.id === id) {
          return { ...item, score: item.score + delta };
        }
        if (item.replies?.length) {
          return { ...item, replies: updateScore(item.replies) };
        }
        return item;
      });

    setComments(updateScore(comments));
  };

  return (
    <div className="w-full mx-auto p-4">
      <SingleComment
        comments={comments}
        currentUser={currentUser}
        onAddReply={handleAddReply}
        onScore={handleScore}
      />

      {/* Global Add Comment Box */}
      {currentUser && (
        <div className="bg-white p-4 rounded-xl shadow-sm w-full sm:w-10/12 mx-auto mt-6 flex sm:flex-row flex-col items-start gap-3">
          <img
            src={currentUser.image.png}
            alt={currentUser.username}
            className="w-8 h-8 rounded-full"
          />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border border-neutral-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows="3"
          />
          <button
            onClick={handleAddComment}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-500"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentsList;
