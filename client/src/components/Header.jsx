import React, { useEffect } from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Badge,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  PowerIcon,
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "./Search";
import { useAuth } from "../contexts/authContext";
import { useUser } from "../contexts/userContext";

// profile menu component
const profileMenuItems = [
  {
    label: "My Account",
    icon: UserCircleIcon,
    link: "/user/profile/account",
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    link: "/user/profile/edit",
  },
  {
    label: "Change Password",
    icon: InboxArrowDownIcon,
    link: "/user/profile/change-password",
  },
  {
    label: "My Orders",
    icon: ClipboardDocumentListIcon,
    link: "/user/profile/orders",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useAuth();
  function handleLogOut() {
    localStorage.removeItem("token");
    window.location.reload();
  }
  const closeMenu = () => setIsMenuOpen(false);
  const { cart } = useUser();

  if (!cart) return null;
  return (
    <div className="flex justify-center gap-5 items-end">
      <Badge content={cart?.length || 0}>
        <Link to={"/user/cart"}>
          <ShoppingCartIcon className="h-7 w-8" />
        </Link>
      </Badge>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 "
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src={user?.image}
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon, link }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            if (isLastItem) {
              return (
                <MenuItem
                  key={label}
                  onClick={closeMenu}
                  className={`flex items-center gap-2 rounded ${
                    isLastItem
                      ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                      : ""
                  }`}
                >
                  <Typography
                    onClick={handleLogOut}
                    as="p"
                    variant="small"
                    className="font-normal flex gap-2 items-center w-full"
                    color={isLastItem ? "red" : "inherit"}
                  >
                    {React.createElement(icon, {
                      className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                      strokeWidth: 2,
                    })}{" "}
                    {label}
                  </Typography>
                </MenuItem>
              );
            }
            return (
              <Link to={link} key={label}>
                <MenuItem
                  key={label}
                  onClick={closeMenu}
                  className={`flex items-center gap-2 rounded ${
                    isLastItem
                      ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                      : ""
                  }`}
                >
                  {React.createElement(icon, {
                    className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                    strokeWidth: 2,
                  })}
                  <Typography
                    as="span"
                    variant="small"
                    className="font-normal"
                    color={isLastItem ? "red" : "inherit"}
                  >
                    {label}
                  </Typography>
                </MenuItem>
              </Link>
            );
          })}
        </MenuList>
      </Menu>
    </div>
  );
}

export default function Header() {
  return (
    <Navbar className="sticky top-0 mx-auto z-30  text-white  p-3  lg:pl-6">
      <div className=" flex items-center gap-3 justify-between text-blue-gray-900">
        <Link to={"/"}>
          <Typography className="cursor-pointer py-1.5 font-medium">
            BOOK SHOP
          </Typography>
        </Link>
        <Search />
        <ProfileMenu />
      </div>
    </Navbar>
  );
}
