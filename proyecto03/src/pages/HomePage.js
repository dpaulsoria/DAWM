import React from "react";
import { MediaCard } from "../components/Card";

function HomePage({ name, urlImage, id, types }) {
  return (
    <div>
      <MediaCard name="Pikachu" urlImage="cat.png" types={["Fire", "Ground"]} />
    </div>
  );
}

export { HomePage };
