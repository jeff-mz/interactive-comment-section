import data from "../../data.json";
import { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

const CommentsList = () => {
  const [comments, setComments] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    setComments(data.comments);
    setCurrentUser(data.currentUser);
  }, []);
  return (
    <div className="w-full mx-auto p-4 ">
      <SingleComment comments={comments} currentUser={currentUser} />

      {/* Add Comment Box */}
      <div className="bg-white p-4 rounded-xl shadow-sm w-full sm:w-10/12 mx-auto mt-6 flex sm:flex-row flex-col items-start gap-3">
        <img
          src={`https://avatar.iran.liara.run/public/20`}
          alt={currentUser}
          className="w-8 h-8 rounded-full"
        />
        <textarea
          placeholder="Add a comment..."
          className="flex-1 border border-neutral-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          rows="3"
        />
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-500">
          Send now
        </button>
      </div>
    </div>
  );
};

export default CommentsList;
