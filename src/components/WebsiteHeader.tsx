import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useCallback,
  memo,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "./User/UserAvatar";
import { motion } from "framer-motion";

const tabs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Project", path: "/projectSelect" },
  { name: "Impressum", path: "/impressum" },
];

const WebsiteHeader: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selected, setSelected] = useState(tabs[0].name);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("/api/check-login");
        const data = await response.json();
        setIsLoggedIn(data.loggedIn);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLoginClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <header className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-primary dark:text-primary-light font-bold text-2xl">
          <Link to="/" id="HeaderTitle">
            LetteHub
          </Link>
        </h1>
        <div className="flex justify-center space-x-4">
          {tabs.map((tab) => (
            <MemoizedChip
              key={tab.name}
              text={tab.name}
              selected={selected === tab.name}
              setSelected={setSelected}
              path={tab.path}
            />
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={handleLoginClick} className="user-icon-button">
            <UserAvatar loggedIn={isLoggedIn} />
          </button>
          <div className="Content">{/* <DarkLightModeSwitch /> */}</div>
        </div>
      </div>
    </header>
  );
};

const Chip = ({
  text,
  selected,
  setSelected,
  path,
}: {
  text: string;
  selected: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
  path: string;
}) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    setSelected(text);
    navigate(path);
  }, [navigate, setSelected, text, path]);

  return (
    <button
      onClick={handleClick}
      className={`${
        selected
          ? "text-foregroundlight dark:text-primary-light"
          : "text-gray-900 dark:text-gray-100 hover:text-primary-light"
      } text-base transition-colors px-3 py-1 rounded-md relative`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-primary to-primary-light dark:from-primary-dark dark:to-primary-light rounded-md"
        ></motion.span>
      )}
    </button>
  );
};

const MemoizedChip = memo(Chip);

export default WebsiteHeader;
