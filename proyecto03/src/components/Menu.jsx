import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import InsightsIcon from "@mui/icons-material/Insights";
import GamesIcon from "@mui/icons-material/Games";
import HubIcon from "@mui/icons-material/Hub";
import { NavLink } from "react-router-dom";
import "../styles/Menu.css";

const blue = "#1976d2";
const red = "#FF3D00";

function onActive(isActive) {
  return isActive ? red : blue;
}

function Menu() {
  return (
    <nav className="Menu">
      <ul>
        <li>
          <NavLink
            style={({ isActive }) => ({
              color: onActive(isActive),
            })}
            to="/"
          >
            {/* {({ isActive }) => {
              <p className={isActive ? "display" : "none"}>Home</p>;
            }} */}

            <HomeIcon />
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => ({
              color: onActive(isActive),
            })}
            to="/stats"
          >
            <InsightsIcon />
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => ({
              color: onActive(isActive),
            })}
            to="/moves"
          >
            <GamesIcon />
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => ({
              color: onActive(isActive),
            })}
            to="/abilities"
          >
            <HubIcon />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

const routes = [];
routes.push({
  to: "/",
  text: "Home",
});
routes.push({
  to: "/stats",
  text: "Stats",
});

export { Menu };
