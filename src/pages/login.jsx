import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Grid,
  styled,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import TextField from "../components/textfield";
import Button from "../components/gradient-button";
import { icons } from "../helper/constants";
import { logInStart } from "../redux/action/authAction";

const GridContainer = styled(Grid)({
  height: "100vh",
  "& .MuiTypography-h5": {
    fontWeight: 700,
  },
  "& .MuiTypography-subtitle2": {
    marginBottom: "2.35em",
  },
});

const Login = () => {
  const [visiblePass, setVisiblePass] = useState(false);
  const [credentials, setCredentials] = useState({
    mobileNo: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) =>
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logInStart(credentials));
  };

  const togglePassVisibility = () =>
    setVisiblePass((visibility) => !visibility);

  return (
    <GridContainer
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={6} sx={{ padding: "0 90px 0 70px" }}>
        <Typography variant="h5" component="div">
          Login
        </Typography>
        <Typography variant="subtitle2" component="div">
          Business Admin
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          name="mobileNo"
          onChange={handleChange}
          value={credentials.mobileNo}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <img
                  src={icons.user}
                  alt="user"
                  height="20px"
                  width="20px"
                  style={{ opacity: 0.2 }}
                />
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: 2, width: "100%" }}
        />
        <TextField
          label="Password"
          variant="outlined"
          name="password"
          type={visiblePass ? "text" : "password"}
          onChange={handleChange}
          value={credentials.password}
          InputProps={{
            endAdornment: (
              <InputAdornment onClick={togglePassVisibility}>
                <IconButton>
                  {visiblePass ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: 4, width: "100%" }}
        />
        <Button
          sx={{
            textTransform: "none",
            width: "25%",
            fontSize: "1rem",
          }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          backgroundColor: "#140a35",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <img src={icons.loginPageImage} alt="loginPageImage" width="650px" />
      </Grid>
    </GridContainer>
  );
};

export default Login;
