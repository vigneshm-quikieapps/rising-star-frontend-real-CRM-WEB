import React, { useEffect, useState } from "react";
import { Box, InputAdornment, Typography } from "@mui/material";
import {
  SearchOutlined as SearchIcon,
} from "@mui/icons-material";
import TextField from "../components/textfield";
import AdvanceSearchList from "../containers/member-list";
import Button from "../components/simple-button";
import { useDispatch, useSelector } from "react-redux";
import { objectToArray } from "../utils";
import { getAllMembersList } from "../redux/action/membersAction";

const SearchMembers = () => {
  // const [searchMembers, setSearchMembers] = useState([]);  
  const dispatch = useDispatch();
  const allMembers = useSelector((state) => state.members.allMembers);
  const [tableRowData, setTableRowData] = useState([]);



  const setTableRows = () => {
    console.log("sdfghjk", allMembers);
    let sessionMembersDetailsArray = allMembers.docs.map((item) => {
      return {
        name: item.name,
        gender: item.gender,
        pname: item.parent[0].name,
        email: item.parent[0].email,
        mobileNo: item.parent[0].mobileNo,
      };
    });
    let finalRowDataArray = sessionMembersDetailsArray.map((item, index) => {
      let itemArray = objectToArray(item);
      return {
        id: index,
        items: itemArray.map((i) => {
          return i[1];
        }),
      };
    });
    setTableRowData(finalRowDataArray);
  };

  useEffect(() => {
    dispatch(getAllMembersList());
  }, [dispatch]);
  useEffect(() => {
    allMembers && allMembers.docs && setTableRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMembers]);

  return (
    <Box>
      {/* Header */}
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

      {/* Input Textfeild & Search button */}
      <Box sx={{ display: "flex", mb: 1 }}>
        <TextField
          placeholder="Search members by name"
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
      {/* MemberList Table */}
      <Box>
        <AdvanceSearchList row={tableRowData} />
      </Box>
    </Box>
  );
};

export default SearchMembers;
