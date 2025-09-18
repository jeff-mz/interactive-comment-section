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
    </div>
  );
};

export default CommentsList;
