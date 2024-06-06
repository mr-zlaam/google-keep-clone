import { Link } from "react-router-dom";
import {} from "react";

function ErrorPage() {
  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen gap-10 text-4xl pattern_dark animate-page">
        <h1 className="text-5xl font-bold">404 | Not Found</h1>
        <p>
          <Link
            to="/"
            className="text-3xl font-semibold transition-all duration-200 link_dark hover:text-blue-400"
          >
            Go Home
          </Link>
        </p>
      </section>
    </>
  );
}

export default ErrorPage;
