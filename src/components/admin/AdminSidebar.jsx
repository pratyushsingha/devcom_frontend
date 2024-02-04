import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { adminNavOptions } from "@/utils";

const AdminSidebar = () => {
  return (
    <div className="flex flex-col space-y-3 mt-5">
      {adminNavOptions.map(({ id, name, path, logo }) => (
        <Link key={id} to={`${path}`}>
          <Button
            variant="ghost"
            className="border-2 px-20 py-2 flex items-center justify-start w-full gap-2"
          >
            {logo}
            <span>{name}</span>
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default AdminSidebar;
