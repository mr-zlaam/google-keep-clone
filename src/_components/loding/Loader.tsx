import {} from "react";

function Loader() {
  return (
    <>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto border-4 border-yellow-500 border-dashed rounded-full animate-spin"></div>
        <h2 className="mt-4 text-zinc-900 dark:text-white">Loading...</h2>
      </div>
    </>
  );
}

export default Loader;
