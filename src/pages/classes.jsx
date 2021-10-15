import { useState } from "react";
import { Box, InputAdornment, Typography } from "@mui/material";
import { SearchOutlined as SearchIcon } from "@mui/icons-material";

import TextField from "../components/textfield";
import Button from "../components/simple-button";
import ClassList from "../containers/class-list";

const Classes = () => {
  const [classList, setClassList] = useState([]);

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
        <Typography variant="h1" sx={{ fontSize: "28px", fontWeight: "bold" }}>
          Classes
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Manage your business here
        </Typography>
      </Box>
      <Box sx={{ display: "flex", mb: 1 }}>
        <TextField
          placeholder="search class by name"
          sx={{ flex: 1, mr: "20px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: "-10px" }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <Button active>Advanced Search</Button>
      </Box>
      <ClassList />
    </Box>
  );
};

export default Classes;
