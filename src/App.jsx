import CommentsList from "./components/CommentsList";
const App = () => {
  return (
    <main className="w-full min-h-screen py-28 bg-neutral-100">
      <div className="container mx-auto">
        <CommentsList />
      </div>
    </main>
  );
};

export default App;
