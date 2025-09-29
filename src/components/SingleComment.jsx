import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Button } from "@headlessui/react";
import replyicon from "../assets/images/icon-reply.svg";
import editicon from "../assets/images/icon-edit.svg";
import deleteicon from "../assets/images/icon-delete.svg";

const SingleComment = ({ comments, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  function openDialog() {
    setIsOpen(true);
  }

  function closeDialog() {
    setIsOpen(false);
  }

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

                {/* Comment content */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://avatar.iran.liara.run/public/${
                          (comment.id % 100) + 1
                        }`}
                        alt={comment.user.username}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-bold text-neutral-800">
                        {comment.user.username}
                      </span>
                      {comment.user.username === currentUser.username && (
                        <span className="bg-primary-600 text-neutral-50 px-1 rounded-sm py-0.5 text-[14px] font-medium">
                          You
                        </span>
                      )}
                      <span className="text-neutral-500 text-sm font-medium">
                        {comment.createdAt}
                      </span>
                    </div>

                    {/* Action buttons */}
                    {comment.user.username === currentUser.username ? (
                      <div className="flex gap-2">
                        <button
                          onClick={openDialog}
                          className="flex items-center gap-1 text-red-500 font-medium hover:underline"
                        >
                          <img
                            src={deleteicon}
                            alt="delete"
                            className="w-4 h-4"
                          />
                          Delete
                        </button>
                        <button className="flex items-center gap-1 text-primary-600 font-medium hover:underline">
                          <img src={editicon} alt="edit" className="w-4 h-4" />
                          Edit
                        </button>
                      </div>
                    ) : (
                      <button className="flex items-center gap-1 text-primary-600 font-medium hover:underline">
                        <img src={replyicon} alt="reply" className="w-4 h-4" />
                        Reply
                      </button>
                    )}
                  </div>

                  {/* Body */}
                  <p className="text-neutral-500 text-sm leading-relaxed font-medium">
                    {comment.content}
                  </p>
                </div>
              </div>

              {/* Mobile layout */}
              <div className="flex flex-col gap-3 sm:hidden">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://avatar.iran.liara.run/public/${
                      (comment.id % 100) + 1
                    }`}
                    alt={comment.user.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-bold text-neutral-800">
                    {comment.user.username}
                  </span>
                  {comment.user.username === currentUser.username && (
                    <span className="bg-primary-600 text-neutral-50 px-1 rounded-sm py-0.5 text-[14px] font-medium">
                      You
                    </span>
                  )}
                  <span className="text-neutral-500 text-sm font-medium">
                    {comment.createdAt}
                  </span>
                </div>

                <p className="text-neutral-500 text-sm leading-relaxed font-medium">
                  {comment.content}
                </p>

                <div className="flex justify-between items-center">
                  {/* Score section */}
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

                  {/* Action buttons */}
                  {comment.user.username === currentUser.username ? (
                    <div className="flex gap-2">
                      <button
                        onClick={openDialog}
                        className="flex items-center gap-1 text-red-500 font-medium hover:underline"
                      >
                        <img
                          src={deleteicon}
                          alt="delete"
                          className="w-4 h-4"
                        />
                        Delete
                      </button>
                      <button className="flex items-center gap-1 text-primary-600 font-medium hover:underline">
                        <img src={editicon} alt="edit" className="w-4 h-4" />
                        Edit
                      </button>
                    </div>
                  ) : (
                    <button className="flex items-center gap-1 text-primary-600 font-medium hover:underline">
                      <img src={replyicon} alt="reply" className="w-4 h-4" />
                      Reply
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Replies */}
            {comment.replies?.length > 0 && (
              <div className="ml-6 border-l-2 border-neutral-200 pl-4">
                <SingleComment
                  comments={comment.replies}
                  currentUser={currentUser}
                />
              </div>
            )}
          </div>
        ))}

      {/* Dialog */}
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeDialog}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/40">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Are you sure you want to delete this comment ?
              </DialogTitle>
              <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
                <Button
                  className="rounded-md w-full sm:w-1/2 bg-neutral-500 px-4 py-4 text-sm font-medium text-neutral-50 hover:bg-gray-300"
                  onClick={closeDialog}
                >
                  NO, CANCEL
                </Button>
                <Button
                  className="rounded-md w-full sm:w-1/2 bg-red-600 px-4 py-4 text-sm font-medium text-neutral-100 hover:bg-red-500"
                  onClick={closeDialog}
                >
                  YES, DELETE
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SingleComment;
