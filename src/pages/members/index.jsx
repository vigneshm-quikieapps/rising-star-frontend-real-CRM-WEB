/// classes v1.0.0

import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, InputAdornment, MenuItem, Typography } from "@mui/material";
import { SearchOutlined as SearchIcon } from "@mui/icons-material";

import { getAllMembersList as getMemberListAction } from "../../redux/action/memberAction";
import { getBusinessListOfBusiness } from "../../redux/action/businesses-actions";
import {
  TextField,
  Button,
  GradientButton,
  Pagination,
} from "../../components";
import MemberList from "./components/members-table";

const AdvancedSearch = ({ open, setOpen, businessList = [], setFilters }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
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
    [name, nameOperator, status, statusOperator, business]
  );

  useEffect(() => {
    setFilters(filters);
  }, [filters, setFilters]);

  const searchHandler = () => {
    dispatch(getMemberListAction({ filters }));
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
        <TextField
          label="Class Name"
          onChange={nameChangeHandler}
          value={name}
          sx={{ width: "calc(50% - 120px)" }}
        />
        <TextField
          select
          onChange={statusChangeHandler}
          value={status}
          label="Status"
          sx={{ width: "calc(50% - 120px)" }}
          variant="outlined"
        >
          <MenuItem value="ACTIVE">Active</MenuItem>
          <MenuItem value="INACTIVE">In-Active</MenuItem>
        </TextField>
        <TextField
          select
          sx={{ width: "200px" }}
          label="Business Name"
          value={business}
          onChange={businessChangeHandler}
        >
          {businessList.map((business) => (
            <MenuItem key={business._id} value={business._id}>
              {business.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          sx={{ width: "calc(50% - 120px)" }}
          label="Operator"
          value={nameOperator}
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

const Members = () => {
  const dispatch = useDispatch();
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [filters, setFilters] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const membersState = useSelector((state) => state.members);
  const { memberList, totalPages, currentPage } = membersState;
  const businesses = useSelector(
    (state) => state.businesses.businessListOfBusiness
  );
  const history = useHistory();

  const handleRowClick = useCallback(
    (id) => {
      history.push(`/members/info/${id}`);
    },
    [history]
  );

  const searchValueChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const addMemberHandler = () => {
    history.push("/members/add");
  };

  const handlePageChange = (_, value) => {
    if (value <= totalPages && value !== currentPage)
      dispatch(
        getMemberListAction({
          page: value,
          filters: filters,
        })
      );
  };

  const items = useMemo(() => {
    return memberList.map((singleMember) => {
      const id = singleMember._id;
      const {
        name,
        gender,
        // parent: { name: parentName, email: parentEmail, contact: parentPhone },
      } = singleMember;
      return {
        id: singleMember.id,
        onClick: () => handleRowClick(id),
        // items: [name, gender, parentName, parentEmail, parentPhone],
        items: [name, gender, "static", "static", "static"],
      };
    });
  }, [memberList, handleRowClick]);

  const pagination = (
    <Pagination
      sx={{ py: 2 }}
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
    />
  );

  useEffect(() => {
    dispatch(getMemberListAction({ page: 1 }));
    dispatch(getBusinessListOfBusiness());
  }, [dispatch]);

  useEffect(() => {
    setFilters([{ field: "name", type: "STARTS_WITH", value: searchValue }]);
  }, [searchValue]);

  useEffect(() => {
    // if (basicSearchResults.length === 1) return;
    const searchTimer = setTimeout(() => {
      dispatch(
        getMemberListAction({
          filters: [{ field: "name", type: "STARTS_WITH", value: searchValue }],
        })
      );
    }, 500);
    return () => clearTimeout(searchTimer);
  }, [searchValue, dispatch]);

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
        <Typography variant="h1" sx={{ fontSize: "28px", fontWeight: "bold" }}>
          Members
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Manage all members here
        </Typography>
      </Box>
      <Box sx={{ display: advancedSearch ? "none" : "flex", mb: 1 }}>
        <TextField
          onChange={searchValueChangeHandler}
          value={searchValue}
          placeholder="search member by name"
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
      <AdvancedSearch
        open={advancedSearch}
        setOpen={setAdvancedSearch}
        businessList={businesses}
        setFilters={setFilters}
      />
      <MemberList
        list={items}
        pagination={pagination}
        onAdd={addMemberHandler}
      />
    </Box>
  );
};

export default Members;
