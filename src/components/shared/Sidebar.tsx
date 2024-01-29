import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/lib/types";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={150}
            height={150}
          />
        </Link>

        <Link to={`/profile/${user?.id}`} className="flex gap-3 items-center">
          <img
            src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="user"
            className="rounded-full h-10 w-10"
          />

          <div className="flex flex-col">
            <p className="body-bold">{user?.name}</p>
            <p className="small-regular text-neutral-500">@{user?.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-neutral-900 border-r-[3px] border-primary-500"
                }`}>
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-3">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive ? "invert-white" : ""
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        className="flex gap-4 justify-start p-3 group hover:bg-primary-500"
        onClick={() => signOut()}>
        <img
          src="/assets/icons/logout.svg"
          alt="logout"
          width={24}
          height={24}
          className="group-hover:invert-white"
        />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default Sidebar;
