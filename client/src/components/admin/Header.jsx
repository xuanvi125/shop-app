import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

import {
  Navbar,
  Typography,
  Breadcrumbs,
  Avatar,
  Button,
} from "@material-tailwind/react";

export function Header() {
  const { user } = useAuth();
  let { pathname } = useLocation();
  const [layout = "", page = ""] = pathname
    .split("/")
    .filter((el) => el !== "");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Navbar
      color="transparent"
      className="rounded-xl transition-all px-0 py-1"
      fullWidth
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs className={`bg-transparent p-0 transition-all`}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-50 transition-all"
            >
              {layout}
            </Typography>

            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page || "Home"}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>

        <div className="flex items-center border p-4 rounded-xl bg-white ">
          <Avatar src={user.image} alt="avatar" />;
          <Typography
            variant="small"
            color="blue-gray"
            className="mx-4 font-bold"
          >
            {user.name}
          </Typography>
          <Button color="red" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </Navbar>
  );
}

export default Header;
