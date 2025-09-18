import replyicon from "../assets/images/icon-reply.svg";
import editicon from "../assets/images/icon-edit.svg";
import deleteicon from "../assets/images/icon-delete.svg";

const Comment = ({ comments }) => {
  return (
    <>
      {comments?.length > 0 &&
        comments.map((comment) => {
          return (
            <div className="my-4" key={comment.id}>
              <div className="bg-white my-4 p-4 rounded-xl shadow-sm w-full sm:w-10/12 mx-auto">
                {/* desktop layout */}
                <div className="hidden sm:flex gap-4">
                  {/* score section (desktop)  */}
                  <div className="flex flex-col items-center justify-around bg-neutral-100 rounded-lg px-2 py-1">
                    <button className="text-primary-200 font-bold text-lg leading-none">
                      +
                    </button>
                    <span className="text-primary-600 font-semibold">
                      {comment.score}
                    </span>
                    <button className="text-primary-200 font-bold text-lg leading-none">
                      −
                    </button>
                  </div>

                  {/* right column (desktop) */}
                  <div className="flex-1">
                    {/* header (desktop) */}
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://avatar.iran.liara.run/public/${
                            Math.floor(Math.random() * 100) + 1
                          }`}
                          alt="User avatar"
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="font-bold text-neutral-800">
                          {comment.user.username}
                        </span>
                        {comment.user.username === "juliusomo" && (
                          <span className="bg-primary-600 text-neutral-50 px-1 rounded-sm py-0.5 text-[14px] font-medium">
                            You
                          </span>
                        )}
                        <span className="text-neutral-500 text-sm font-medium">
                          {comment.createdAt}
                        </span>
                      </div>
                      {/* reply button (desktop) */}
                      {comment.user.username === "juliusomo" ? (
                        <div className="flex flex-row gap-2">
                          <button className="text-primary-400 font-medium hover:underline flex items-center">
                            <img
                              src={deleteicon}
                              alt="delete icon"
                              className="w-4 h-4 mr-2"
                            />
                            Reply
                          </button>

                          <button className="text-primary-600 font-medium hover:underline flex items-center">
                            <img
                              src={editicon}
                              alt="edit icon"
                              className="w-4 h-4 mr-2"
                            />
                            edit
                          </button>
                        </div>
                      ) : (
                        <button className="text-primary-600 font-medium hover:underline flex items-center">
                          <img
                            src={replyicon}
                            alt="reply icon"
                            className="w-4 h-4 mr-2"
                          />
                          Reply
                        </button>
                      )}
                    </div>

                    {/* body (desktop) */}
                    <p className="text-neutral-500 text-sm leading-relaxed font-medium">
                      {comment.content}
                    </p>
                  </div>
                </div>

                {/* mobile layout */}
                <div className="flex flex-col gap-3 sm:hidden">
                  {/* header (mobile)*/}
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://avatar.iran.liara.run/public/${
                        Math.floor(Math.random() * 100) + 1
                      }`}
                      alt="User avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-bold text-neutral-800">
                      {comment.user.username}
                    </span>
                    {comment.user.username === "juliusomo" && (
                      <span className="bg-primary-600 text-neutral-50 px-1 rounded-sm py-0.5 text-[14px] font-medium">
                        You
                      </span>
                    )}
                    <span className="text-neutral-500 text-sm font-medium">
                      {comment.createdAt}
                    </span>
                  </div>

                  {/* body */}
                  <p className="text-neutral-500 text-sm leading-relaxed font-medium">
                    {comment.content}
                  </p>

                  {/* reply  (mobile) */}
                  <div className="flex justify-between items-center">
                    {/* score section (mobile) */}
                    <div className="flex items-center bg-neutral-100 rounded-lg px-2 py-1">
                      <button className="text-primary-200 font-bold text-lg leading-none">
                        +
                      </button>
                      <span className="text-primary-600 font-semibold px-2">
                        {comment.score}
                      </span>
                      <button className="text-primary-200 font-bold text-lg leading-none">
                        −
                      </button>
                    </div>
                    {/* reply button (mobile) */}
                    {comment.user.username === "juliusomo" ? (
                      <div className="flex  gap-2">
                        <button className="text-primary-400 font-medium hover:underline flex items-center">
                          <img
                            src={deleteicon}
                            alt="delete icon"
                            className="w-4 h-4 mr-2"
                          />
                          Reply
                        </button>

                        <button className="text-primary-600 font-medium hover:underline flex items-center">
                          <img
                            src={editicon}
                            alt="edit icon"
                            className="w-4 h-4 mr-2"
                          />
                          edit
                        </button>
                      </div>
                    ) : (
                      <button className="text-primary-600 font-medium hover:underline flex items-center">
                        <img
                          src={replyicon}
                          alt="reply icon"
                          className="w-4 h-4 mr-2"
                        />
                        Reply
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {comment.replies?.length > 0 && (
                <div className="ml-6 border-l-2 border-neutral-200 pl-4">
                  <Comment comments={comment.replies} />
                </div>
              )}
            </div>
          );
        })}
    </>
  );
};

export default Comment;
