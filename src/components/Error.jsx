import { Link } from "react-router-dom";
import Button from "./Button";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-grow items-center justify-center">
      <div className="rounded-lg bg-white p-8 text-center shadow-xl">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="text-gray-600">
          Oops! The page you are looking for could not be found.
        </p>
        <Link to="/">
          <Button classname="w-full my-3"> Go back to Home </Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
