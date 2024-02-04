import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { FaEdit, FaUser } from "react-icons/fa";

const ProfileSidebar = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Link to="/profile">
        <Button
          variant="ghost"
          className="flex space-x-3 border-2 px-20 py-2 w-full"
        >
          <FaUser />
          <span>account</span>
        </Button>
      </Link>
      <Link to="/profile/edit">
        <Button
          variant="ghost"
          className="flex space-x-3 border-2 px-20 py-2 w-full"
        >
          <FaEdit />
          <span>edit profile</span>
        </Button>
      </Link>
    </div>
  );
};

export default ProfileSidebar;
