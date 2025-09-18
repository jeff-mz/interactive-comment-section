import Comment from "./comment";
import data from "../../data.json";
import { useEffect, useState } from "react";

const Comments = () => {
  const [comments, setComments] = useState(undefined);
  useEffect(() => {
    setComments(data.comments);
  }, []);
  return (
    <div className="w-full mx-auto p-4 ">
      <Comment comments={comments} />
    </div>
  );
};

export default Comments;
