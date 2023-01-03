import "./App.css";
import React from "react";
import { SearchAppBar } from "./components/Topbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { StatsPage } from "./pages/StatsPage";
import { Menu } from "./components/Menu";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SearchAppBar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/moves" element={<StatsPage />} />
          <Route path="/abilities" element={<StatsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Menu />
      </BrowserRouter>
    </div>
  );
}

export default App;
