import React, { useState } from "react";
import { Card } from "../components/Card";
import { Container } from "@mui/material";

function Home() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Container>
      <Card />
      <Card />
    </Container>
  );
}

export { Home };
