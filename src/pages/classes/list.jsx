/// Classes v1.0.0

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, InputAdornment, MenuItem, Typography } from "@mui/material";
import { SearchOutlined as SearchIcon } from "@mui/icons-material";

import {
  TextField,
  Button,
  GradientButton,
  Actions as ActionButtons,
  Status,
  Pagination,
} from "../../components";
import ClassList from "./components/classes-table";
import {
  getClassList as getClassListAction,
  deleteClass,
} from "../../redux/action/class-actions";
import toPascal from "../../utils/to-pascal";

const AdvancedSearch = ({
  open,
  setOpen,
  businessList = [],
  setFilters,
  name,
  setName,
}) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("ACTIVE");
  const [business, setBusiness] = useState("");
  const [nameOperator, setNameOperator] = useState("STARTS_WITH");
  const [statusOperator, setStatusOperator] = useState("EQUALS");

  const nameChangeHandler = (e) => setName(e.target.value);
  const statusChangeHandler = (e) => setStatus(e.target.value);
  const businessChangeHandler = (e) => setBusiness(e.target.value);
  const nameOperatorChangeHandler = (e) => setNameOperator(e.target.value);
  const statusOperatorChangeHandler = (e) => setStatusOperator(e.target.value);

  const filters = useMemo(
    () => [
      { field: "name", type: nameOperator, value: name },
      { field: "businessId", type: "BY_ID", value: business },
      { field: "status", type: statusOperator, value: status },
    ],
    [name, nameOperator, status, statusOperator, business],
  );

  // Do not remove, used for pagination
  useEffect(() => {
    setFilters(filters);
  }, [filters, setFilters]);

  const searchHandler = () => {
    dispatch(getClassListAction({ filters }));
  };

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
          placeholder="Search by class name"
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
        {name.length > 0 ? (
          <TextField
            label="Class Name"
            onChange={nameChangeHandler}
            value={name}
            variant="outlined"
            InputLabelProps={{ style: { background: "#fff" } }}
            sx={{ width: "calc(50% - 120px)" }}
          />
        ) : (
          <TextField
            label="Class Name"
            onChange={nameChangeHandler}
            value={name}
            variant="outlined"
            sx={{ width: "calc(50% - 120px)", backgroundColor: "#f4f4f4" }}
          />
        )}

        <TextField
          select
          onChange={statusChangeHandler}
          value={status}
          label="Status"
          sx={{ width: "calc(50% - 120px)" }}
          variant="outlined"
          InputLabelProps={{ style: { background: "#fff" } }}
        >
          <MenuItem value="ACTIVE">Active</MenuItem>
          <MenuItem value="INACTIVE">In-Active</MenuItem>
        </TextField>
        {business.length > 0 ? (
          <TextField
            select
            sx={{ width: "200px" }}
            label="Business Name"
            value={business}
            variant="outlined"
            InputLabelProps={{ style: { background: "#fff" } }}
            onChange={businessChangeHandler}
          >
            {businessList.map((business) => (
              <MenuItem key={business._id} value={business._id}>
                {business.name}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <TextField
            select
            sx={{ width: "200px", backgroundColor: "#f4f4f4" }}
            label="Business Name"
            value={business}
            variant="outlined"
            onChange={businessChangeHandler}
          >
            {businessList.map((business) => (
              <MenuItem key={business._id} value={business._id}>
                {business.name}
              </MenuItem>
            ))}
          </TextField>
        )}

        <TextField
          select
          sx={{ width: "calc(50% - 120px)" }}
          label="Operator"
          value={nameOperator}
          variant="outlined"
          InputLabelProps={{ style: { background: "#fff" } }}
          onChange={nameOperatorChangeHandler}
        >
          <MenuItem value="EQUALS">Equals to</MenuItem>
          <MenuItem value="STARTS_WITH">Starts with</MenuItem>
        </TextField>
        <TextField
          select
          sx={{ width: "calc(50% - 120px)" }}
          label="Operator"
          value={statusOperator}
          variant="outlined"
          InputLabelProps={{ style: { background: "#fff" } }}
          onChange={statusOperatorChangeHandler}
        >
          <MenuItem value="EQUALS">Equals to</MenuItem>
          <MenuItem value="NOT_EQUALS">Not equals to</MenuItem>
        </TextField>
        <GradientButton
          sx={{ width: "200px !important" }}
          onClick={searchHandler}
        >
          Search
        </GradientButton>
      </Box>
    )
  );
};

const Classes = () => {
  const dispatch = useDispatch();
  const mounted = useRef(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [filters, setFilters] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const classesState = useSelector((state) => state.classes);
  const { classList, totalPages, currentPage } = classesState;
  const businesses = useSelector((state) => state.businesses.businessList);
  const history = useHistory();

  const handleEdit = useCallback(
    (e, id) => {
      e.stopPropagation();
      history.push(`/classes/add/${id}?edit=true`);
    },
    [history],
  );

  const handleDelete = useCallback(
    (e, id) => {
      e.stopPropagation();
      dispatch(deleteClass(id));
    },
    [dispatch],
  );

  const handleRowClick = useCallback(
    (id) => {
      history.push(`/classes/definition/${id}`);
    },
    [history],
  );

  const searchValueChangeHandler = (e) => {
    setSearchValue(e.target.value);
    // Do not remove, used for pagination of basic and advanced search
    setFilters([{ field: "name", type: "STARTS_WITH", value: e.target.value }]);
  };

  const addClassHandler = () => {
    history.push("/classes/add");
  };

  const handlePageChange = (_, value) => {
    if (value <= totalPages && value !== currentPage)
      dispatch(
        getClassListAction({
          page: value,
          filters: filters,
        }),
      );
  };

  const items = useMemo(() => {
    const statusColors = { ACTIVE: "green", INACTIVE: "red" };
    const statusText = {
      ACTIVE: "Active",
      INACTIVE: "Inactive",
    };
    return classList.map((singleClass) => {
      const businessName = businesses.filter(
        (business) => business._id === singleClass.businessId,
      )[0]?.name;
      const id = singleClass._id;
      const { status, name } = singleClass;
      return {
        id: singleClass.id,
        onClick: () => handleRowClick(id),
        items: [
          name,
          businessName,
          <Status status={statusColors[status]} title={statusText[status]} />,
          <ActionButtons
            onEdit={(e) => handleEdit(e, id)}
            onDelete={(e) => handleDelete(e, id)}
          />,
        ],
      };
    });
  }, [classList, handleEdit, handleDelete, businesses, handleRowClick]);

  const pagination = (
    <Pagination
      sx={{ py: 2 }}
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
    />
  );

  useEffect(() => {
    dispatch(getClassListAction({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (!mounted.current) return (mounted.current = true);
    if (showAdvancedSearch) return;
    const searchTimer = setTimeout(() => {
      dispatch(
        getClassListAction({
          filters: [{ field: "name", type: "STARTS_WITH", value: searchValue }],
        }),
      );
    }, 500);
    return () => clearTimeout(searchTimer);
  }, [searchValue, showAdvancedSearch, dispatch]);

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
          Manage your classes here
        </Typography>
      </Box>
      <Box sx={{ display: showAdvancedSearch ? "none" : "flex", mb: 1 }}>
        <TextField
          onChange={searchValueChangeHandler}
          value={searchValue}
          placeholder="Search by class name"
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
        <Button onClick={() => setShowAdvancedSearch(true)} active>
          Advanced Search
        </Button>
      </Box>
      <AdvancedSearch
        open={showAdvancedSearch}
        setOpen={setShowAdvancedSearch}
        businessList={businesses}
        setFilters={setFilters}
        name={searchValue}
        setName={setSearchValue}
      />
      <ClassList list={items} pagination={pagination} onAdd={addClassHandler} />
    </Box>
  );
};

export default Classes;
