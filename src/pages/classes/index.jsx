import { useState } from "react";
import { Box, InputAdornment, MenuItem, Typography } from "@mui/material";
import { SearchOutlined as SearchIcon } from "@mui/icons-material";

import TextField from "../../components/textfield";
import Button from "../../components/simple-button";
import GradientButton from "../../components/gradient-button";
import ClassList from "../../containers/class-list";

const AdvancedSearch = ({ open, setOpen }) => {
  const [selectedBusiness, setSelectedBusiness] = useState("");

  const handleBusinessChange = (e) => setSelectedBusiness(e.target.value);
  return (
    open && (
      <Box
        sx={{
          display: open ? "flex" : "none",
          justifyContent: "space-between",
          "&>*": { width: "30%" },
        }}
      >
        <TextField
          select
          label="Business Name"
          value={selectedBusiness}
          onChange={handleBusinessChange}
        >
          <MenuItem value="business1">Business 1</MenuItem>
          <MenuItem value="business2">Business 2</MenuItem>
        </TextField>
        <GradientButton onClick={() => setOpen(false)}>
          Switch to Basic
        </GradientButton>
        <GradientButton>Search</GradientButton>
      </Box>
    )
  );
};

const Classes = () => {
  const [classList, setClassList] = useState([]);
  const [advancedSearch, setAdvancedSearch] = useState(false);
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
      <Box sx={{ display: advancedSearch ? "none" : "flex", mb: 1 }}>
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
        <Button onClick={() => setAdvancedSearch(true)} active>
          Advanced Search
        </Button>
      </Box>
      <AdvancedSearch open={advancedSearch} setOpen={setAdvancedSearch} />
      <ClassList />
    </Box>
  );
};

export default Classes;
