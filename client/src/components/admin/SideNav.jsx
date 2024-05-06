import { NavLink } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";

export function SideNav({ routes }) {
  return (
    <aside
      className={`bg-white shadow-sm
      -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 
      rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className="relative">
        <div className="py-6 px-8 text-center">
          <Typography variant="h5" color="blue-gray">
            <a href="/">MY BOOK SHOP</a>
          </Typography>
        </div>
      </div>

      <div className="m-4">
        {routes.map(({ layout, pages }, key) => {
          if (layout !== "admin") return null;

          return (
            <ul key={key} className="mb-4 flex flex-col gap-1">
              {pages.map(({ icon, name, path }) => (
                <li key={name}>
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          );
        })}
      </div>
    </aside>
  );
}

export default SideNav;
