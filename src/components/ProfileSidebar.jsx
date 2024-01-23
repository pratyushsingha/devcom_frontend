import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const ProfileSidebar = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Link to="/profile">
        <Button variant="ghost" className="border-2 px-20 py-2 w-full">
          account
        </Button>
      </Link>
      <Link to="/profile/edit">
        <Button variant="ghost" className="border-2 px-20 py-2 w-full">
          edit profile
        </Button>
      </Link>
    </div>
  );
};

export default ProfileSidebar;
