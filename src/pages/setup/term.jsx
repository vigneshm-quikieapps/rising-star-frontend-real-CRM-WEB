import React, { useState } from "react";
import { Card, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { Box } from "@mui/material";
import GradientButton from "../components/gradient-button";
import StyledPagination from "../components/pagination";
import ImgIcon from "../components/img-icon";
import IconButton from "../components/icon-button";
import deleteIcon from "../assets/icons/icon-delete.png";
import DatePicker from "../components/date-picker";
import TextField from "../components/textfield";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import addIcon from "../assets/icons/icon-add.png";

const Term = () => {
  const listarray = ["sds", "cwcwc", "vvevev", "EFveve"];
  const useStyles = styled({});
  const [page, setPage] = useState(3);
  const [date, setDate] = useState(new Date("2014-08-18T21:11:54"));

  return (
    <Box>
      <Typography sx={{ fontSize: "28px", fontWeight: "bold" }}>
        Terms
      </Typography>
      <Typography sx={{ fontSize: "12px", opacity: 0.5 }}>
        Manage all terms here
      </Typography>

      <Box sx={{ marginTop: "20px" }}>
        <TextField
          label="Business Name*"
          variant="filled"
          select
          sx={{ width: "410px" }}
        />
      </Box>
      <Card sx={{ marginTop: "20px" }}>
        <Box
          sx={{
            marginTop: "10px",
            paddingLeft: "20px",
            paddingBottom: "10px",
            paddingRight: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Billing
          </Typography>
          <Box sx={{ display: "flex" }}>
            <GradientButton sx={{ width: "52px" }}>
              <ImgIcon alt="more">{addIcon}</ImgIcon>
            </GradientButton>
            <Box sx={{ marginLeft: "10px" }}>
              <IconButton sx={{ width: "52px" }}>
                <KeyboardArrowUpIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            paddingTop: "15px",
            paddingBottom: "15px",
            paddingLeft: "20px",
            paddingRight: "20px",
            display: "flex",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box>
            <Typography
              sx={{ width: "109px", fontSize: 14, fontWeight: "bold" }}
            >
              Term Code
            </Typography>
          </Box>
          <Box sx={{ marginLeft: "10px" }}>
            <Typography
              sx={{ width: "233px", fontSize: 14, fontWeight: "bold" }}
            >
              Term Label
            </Typography>
          </Box>
          <Box sx={{ marginLeft: "10px" }}>
            <Typography
              sx={{ width: "138px", fontSize: 14, fontWeight: "bold" }}
            >
              Start Date
            </Typography>
          </Box>
          <Box sx={{ marginLeft: "10px" }}>
            <Typography
              sx={{ width: "138px", fontSize: 14, fontWeight: "bold" }}
            >
              End Date
            </Typography>
          </Box>
          <Box sx={{ marginLeft: "10px" }}>
            <Typography
              sx={{ width: "127px", fontSize: 14, fontWeight: "bold" }}
            >
              Session Sequence
            </Typography>
          </Box>
          <Box sx={{ marginLeft: "10px" }}>
            <Typography
              sx={{ width: "127px", fontSize: 14, fontWeight: "bold" }}
            >
              Action
            </Typography>
          </Box>
        </Box>

        {listarray.map(function (item, index) {
          return (
            <Box
              sx={{
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingLeft: "20px",
                paddingRight: "20px",
                display: "flex",
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                alignItems: "center",
              }}
            >
              <Box>
                <TextField
                  variant="filled"
                  inputProps={{ readOnly: true }}
                  sx={{ width: "109px" }}
                  value={"2230"}
                />
              </Box>
              <Box sx={{ marginLeft: "10px" }}>
                <TextField
                  variant="filled"
                  inputProps={{ readOnly: true }}
                  sx={{ width: "233px" }}
                  value={"2022 summer"}
                />
              </Box>
              <Box sx={{ marginLeft: "10px" }}>
                <DatePicker
                  label={null}
                  date={date}
                  onChange={(newDate) => setDate(newDate)}
                  sx={{ width: "138px" }}
                />
              </Box>
              <Box sx={{ marginLeft: "10px" }}>
                <DatePicker
                  label={null}
                  date={date}
                  onChange={(newDate) => setDate(newDate)}
                  sx={{ width: "138px" }}
                  
                />
              </Box>
              <Box sx={{ marginLeft: "10px" }}>
                <TextField
                  variant="filled"
                  inputProps={{ readOnly: true }}
                  sx={{ width: "127px" }}
                  value={"1001"}
                />
              </Box>
              <Box sx={{ marginLeft: "10px" }}>
                <ImgIcon alt="more">{deleteIcon}</ImgIcon>
              </Box>
            </Box>
          );
        })}
      </Card>
      <Box
        sx={{
          marginTop: "20px",
          marginBottom: "53px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledPagination
          count={3}
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </Box>
    </Box>
  );
};
export default Term;
