import { useMediaQuery } from "@mantine/hooks";
import { AlignJustify, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";
import { HashLink } from "react-router-hash-link";

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const auth = useSelector((state) => state.auth.userAndToken);
  const matches = useMediaQuery("(max-width: 767px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-between h-20 border-b border-light/25 items-center px-5 fixed top-0 left-0 right-0 bg-dark/80 z-[1000] backdrop-blur-xl"
      data-aos="fade-down"
      data-aos-duration="1000"
    >
      <div className="left">
        <HashLink to="/" className="text-xl font-medium">
          Grand Cineplex
        </HashLink>
      </div>

      <div className="mid hidden md:flex gap-5">
        <HashLink to="/" className="link-item">
          Home
        </HashLink>
        <HashLink to="/movies" className="link-item">
          Movies
        </HashLink>
        <HashLink to="/actors" className="link-item">
          Actors
        </HashLink>
        <HashLink to="/about" className="link-item">
          About
        </HashLink>
        <HashLink to="/contact" className="link-item">
          Contact
        </HashLink>
        {auth?.user?.role === "admin" && (
          <HashLink to="/admin/manage-movies" className="link-item">
            Manage Movies
          </HashLink>
        )}
      </div>

      <div className="right flex gap-5 items-center">
        {auth?.user ? (
          <div className="flex items-center gap-5">
            <HashLink
              to="/profile"
              className="w-12 h-12 rounded-full overflow-hidden"
            >
              <img
                src={auth?.user?.photoUrl}
                alt={auth?.user?.name}
                className="w-full h-full object-cover"
              />
            </HashLink>
            <button
              onClick={() => {
                {
                  dispatch(logout());
                }
                navigate("/");
              }}
              className="btn"
            >
              Log out
            </button>
          </div>
        ) : (
          <HashLink to="/login" className="btn">
            Sign in
          </HashLink>
        )}

        <button
          className="z-[1002] block md:hidden"
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        >
          {isMobileNavOpen ? <X /> : <AlignJustify />}
        </button>
      </div>

      {isMobileNavOpen && matches && (
        <div
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-red flex items-center justify-center"
        >
          <div className="flex flex-col gap-5 items-start text-xl">
            <HashLink to="/" className="link-item">
              Home
            </HashLink>
            <HashLink to="/movies" className="link-item">
              Movies
            </HashLink>
            <HashLink to="/actors" className="link-item">
              Actors
            </HashLink>
            <HashLink to="/about" className="link-item">
              About
            </HashLink>
            <HashLink to="/contact" className="link-item">
              Contact
            </HashLink>
            {auth?.user?.role === "admin" && (
              <HashLink to="/admin/manage-movies" className="link-item">
                Manage Movies
              </HashLink>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Navbar;
