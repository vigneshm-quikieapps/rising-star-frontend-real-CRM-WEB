/// Members v1.0.0

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, InputAdornment, MenuItem, Typography } from "@mui/material";
import { SearchOutlined as SearchIcon } from "@mui/icons-material";

import { getAllMembersList as getMemberListAction } from "../../redux/action/memberAction";
import {
  TextField,
  Button,
  GradientButton,
  Pagination,
} from "../../components";
import MemberList from "./components/members-table";

const operators = {
  STARTS_WITH: "STARTS_WITH",
  EQUALS_TO: "EQUALS_TO",
  NOT_EQUALS: "NOT_EQUALS",
};

const initialValuesState = {
  name: "",
  "parent.name": "",
  email: "",
  phone: "",
};
const startsWith = operators.STARTS_WITH;
const initialOperatorsState = {
  name: startsWith,
  "parent.name": startsWith,
  email: startsWith,
  phone: startsWith,
};

const OperatorField = ({ area, onChange, name, ...otherProps }) => {
  const changeHandler = (e) => {
    onChange(e, name);
  };
  return (
    <TextField
      select
      sx={{ gridArea: area }}
      label="Operator"
      onChange={changeHandler}
      {...otherProps}
    >
      <MenuItem value="EQUALS">Equals to</MenuItem>
      <MenuItem value="STARTS_WITH">Starts with</MenuItem>
    </TextField>
  );
};

const AdvancedSearch = ({ open, setOpen, setFilters }) => {
  const dispatch = useDispatch();
  const [valuesState, setValuesState] = useState(initialValuesState);
  const [operatorsState, setOperatorsState] = useState(initialOperatorsState);

  const valuesChangeHandler = (e) => {
    setValuesState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const operatorsChangeHandler = (e, name) => {
    setOperatorsState((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const filters = useMemo(() => {
    return Object.keys(valuesState).map((field) => ({
      field,
      type: operatorsState[field],
      value: valuesState[field],
    }));
  }, [valuesState, operatorsState]);

  // Do not remove, used for pagination
  useEffect(() => setFilters(filters), [filters, setFilters]);

  const searchHandler = () => {
    dispatch(getMemberListAction({ filters }));
  };

  return (
    open && (
      <Box
        sx={{
          display: open ? "grid" : "none",
          gridTemplateAreas: `"basicInput basicInput  basicSearch"
                              "name       nameOp      phone"
                              "parent     parentOp    phoneOp"
                              "email      emailOp     advanced"`,
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "10px",
        }}
      >
        <TextField
          placeholder="search member by name"
          sx={{
            gridArea: "basicInput",
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
          sx={{ gridArea: "basicSearch" }}
          active
          onClick={() => setOpen(false)}
        >
          Basic Search
        </Button>
        <TextField
          sx={{ gridArea: "name" }}
          label="Member Name"
          name="name"
          onChange={valuesChangeHandler}
          value={valuesState.name}
        />
        <TextField
          sx={{ gridArea: "parent" }}
          label="Parent / Carer Name"
          name="parent.name"
          onChange={valuesChangeHandler}
          value={valuesState["parent.name"]}
        />
        <TextField
          sx={{ gridArea: "email" }}
          label="Parent / Carer Email"
          name="email"
          onChange={valuesChangeHandler}
          value={valuesState.email}
        />
        <TextField
          sx={{ gridArea: "phone" }}
          label="Parent / Carer Phone"
          name="phone"
          onChange={valuesChangeHandler}
          value={valuesState.phone}
        />
        {Object.keys(operatorsState).map((name) => (
          <OperatorField
            key={name}
            name={name}
            area={name + "Op"}
            value={operatorsState[name]}
            onChange={operatorsChangeHandler}
          />
        ))}
        <GradientButton sx={{ gridArea: "advanced" }} onClick={searchHandler}>
          Search
        </GradientButton>
      </Box>
    )
  );
};

const Members = () => {
  const dispatch = useDispatch();
  const mounted = useRef(false);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [filters, setFilters] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const membersState = useSelector((state) => state.members);
  const { memberList, totalPages, currentPage } = membersState;
  const history = useHistory();

  const handleRowClick = useCallback(
    (id) => {
      history.push(`/members/info/${id}`);
    },
    [history]
  );

  const searchValueChangeHandler = (e) => {
    setSearchValue(e.target.value);
    // Do not remove, used for pagination of basic and advanced search
    setFilters([{ field: "name", type: "STARTS_WITH", value: e.target.value }]);
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
  }, [dispatch]);

  useEffect(() => {
    if (!mounted.current) return (mounted.current = true);
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
