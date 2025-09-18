import data from "../../data.json";
import { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

const CommentsList = () => {
  const [comments, setComments] = useState(undefined);
  useEffect(() => {
    setComments(data.comments);
  }, []);
  return (
    <div className="w-full mx-auto p-4 ">
      <SingleComment comments={comments} />
    </div>
  );
};

export default CommentsList;
