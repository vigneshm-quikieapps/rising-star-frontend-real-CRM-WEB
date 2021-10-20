import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, InputAdornment, MenuItem, Typography } from "@mui/material";
import { SearchOutlined as SearchIcon } from "@mui/icons-material";

import TextField from "../../components/textfield";
import Button from "../../components/simple-button";
import GradientButton from "../../components/gradient-button";
import ActionButtons from "../../components/actions";
import ClassList from "../../containers/class-list";
import { getClassList, deleteClass } from "../../redux/action/class-actions";
import { getBusinessList } from "../../redux/action/businesses-actions";
import { useSelector } from "react-redux";
import Status from "../../components/status";

const AdvancedSearch = ({ open, setOpen }) => {
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [classNameOperator, setClassNameOperator] = useState("equalsTo");
  const [statusOperator, setStatusOperator] = useState("equalsTo");

  const handleBusinessChange = (e) => setSelectedBusiness(e.target.value);
  const handleClassOperatorChange = (e) => setClassNameOperator(e.target.value);
  const handleStatusOperatorChange = (e) => setStatusOperator(e.target.value);

  return (
    open && (
      <Box
        sx={{
          display: open ? "flex" : "none",
          flexWrap: "wrap",
          justifyContent: "space-between",
          "&>*": { width: "30%", marginBottom: "16px !important" },
        }}
      >
        <TextField
          placeholder="search class by name"
          sx={{
            width: "calc(100% - 220px)",
            mr: "20px",
            bgcolor: (theme) => theme.palette.highlight.main,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: "-10px" }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          disabled
        />
        <Button
          active
          sx={{ width: "200px !important", justifySelf: "flex-end" }}
          onClick={() => setOpen(false)}
        >
          Basic Search
        </Button>
        <TextField label="Class Name" sx={{ width: "calc(50% - 120px)" }} />
        <TextField label="Status" sx={{ width: "calc(50% - 120px)" }} />
        <TextField
          select
          sx={{ width: "200px" }}
          label="Business Name"
          value={selectedBusiness}
          onChange={handleBusinessChange}
        >
          <MenuItem value="business1">Business 1</MenuItem>
          <MenuItem value="business2">Business 2</MenuItem>
        </TextField>
        <TextField
          select
          sx={{ width: "calc(50% - 120px)" }}
          label="Operator"
          value={classNameOperator}
          onChange={handleClassOperatorChange}
        >
          <MenuItem value="equalsTo">Equals to</MenuItem>
          <MenuItem value="startsWith">Starts with</MenuItem>
        </TextField>
        <TextField
          select
          sx={{ width: "calc(50% - 120px)" }}
          label="Operator"
          value={statusOperator}
          onChange={handleStatusOperatorChange}
        >
          <MenuItem value="equalsTo">Equals to</MenuItem>
          <MenuItem value="NotEqualsTo">Not equals to</MenuItem>
        </TextField>
        <GradientButton sx={{ width: "200px !important" }}>
          Search
        </GradientButton>
      </Box>
    )
  );
};

const Classes = () => {
  const dispatch = useDispatch();
  const classList = useSelector((state) => state.classes.classList);
  const businesses = useSelector((state) => state.businesses.businessList);
  const history = useHistory();
  const handleEdit = useCallback(
    (id) => {
      history.push(`/classes/add/${id}?edit=true`);
    },
    [history]
  );
  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteClass(id));
    },
    [dispatch]
  );
  const items = useMemo(() => {
    return classList.map((singleClass) => {
      const businessName = businesses.filter(
        (business) => business._id === singleClass.businessId
      )[0].name;
      return {
        id: singleClass.id,
        items: [
          singleClass.name,
          businessName,
          <Status status="green" title={singleClass.status} />,
          <ActionButtons
            onEdit={() => handleEdit(singleClass._id)}
            onDelete={() => handleDelete(singleClass._id)}
          />,
        ],
      };
    });
  }, [classList, handleEdit, handleDelete, businesses]);
  console.log("classList", classList, "items", items);
  const [advancedSearch, setAdvancedSearch] = useState(false);

  useEffect(() => {
    dispatch(getClassList("614ae0f9c265630cd520ab36"));
    dispatch(getBusinessList());
  }, [dispatch]);

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
      <ClassList list={items} />
    </Box>
  );
};

export default Classes;
