import "./App.css";
import "./Style.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SearchBar } from "./components/SearchBar";
import { NotFound } from "./components/NotFound";
import { Header } from "./components/Header";

import { Home } from "./views/Home";

import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

const Theme = createTheme({
  palette: {
    primary: {
      main: colors.orange[500],
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <BrowserRouter>
          <SearchBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/baseStats" element={<NotFound />} />
            <Route path="/moves" element={<NotFound />} />
            <Route path="/abilities" element={<NotFound />} />
          </Routes>
          <Header className="header" />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
