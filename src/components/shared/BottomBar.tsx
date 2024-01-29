import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar bg-dark-2 border border-dark-4">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={link.label}
            className={`${
              isActive && link.label !== "Create" && "invert-white"
            } ${
              link.label === "Create" && "rounded-full bg-primary-500 -mt-12"
            } flex-center flex-col gap-1 p-3 transition`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              className={`group-hover:invert-white ${isActive && "invert-white"}
                ${link.label === "Create" && "invert-white"}
                w-6 h-6`}
            />
          </Link>
        );
      })}
    </section>
  );
};

export default BottomBar;
