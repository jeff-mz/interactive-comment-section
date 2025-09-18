// SingleComment.jsx
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import replyicon from "../assets/images/icon-reply.svg";
import editicon from "../assets/images/icon-edit.svg";
import deleteicon from "../assets/images/icon-delete.svg";

const SingleComment = ({ comments, currentUser, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  function openModal(comment) {
    setCommentToDelete(comment);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setCommentToDelete(null);
  }

  function handleConfirmDelete() {
    if (commentToDelete) {
      onDelete(commentToDelete.id);
    }
    closeModal();
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
                          onClick={() => openModal(comment)}
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

              {/* Replies */}
              {comment.replies?.length > 0 && (
                <div className="ml-6 border-l-2 border-neutral-200 pl-4">
                  <SingleComment
                    comments={comment.replies}
                    currentUser={currentUser}
                    onDelete={onDelete}
                  />
                </div>
              )}
            </div>

            {/* Mobile layout */}
            <div className="flex flex-col gap-3  p-4 rounded-md sm:hidden">
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
                      onClick={() => openModal(comment)}
                      className="flex items-center gap-1 text-red-500 font-medium hover:underline"
                    >
                      <img src={deleteicon} alt="delete" className="w-4 h-4" />
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
        ))}

      {/* Delete Confirmation Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Delete Comment
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this comment? This action
                    cannot be undone.
                  </p>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={closeModal}
                    className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SingleComment;
