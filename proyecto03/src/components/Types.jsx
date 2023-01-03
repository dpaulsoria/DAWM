import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "../styles/Types.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function BasicGrid({ types }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid className="types" container spacing={2}>
        {types.map((type) => (
          <Grid item xs={types.length % 2 === 0 ? 6:4}>
            <Item className={type + " text"}>{type}</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export { BasicGrid };
