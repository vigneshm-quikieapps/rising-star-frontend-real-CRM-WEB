import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import {
  Grid,
  styled,
  Typography,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useSetUser } from "../contexts/user-context";
import { useSetError } from "../contexts/error-context";
import { useLoginMutation } from "../services/mutations";
import { transformError } from "../utils";
import { clearErrors } from "../redux/action/shared-actions";
import { TextField, GradientButton } from "../components";
import { userIcon } from "../assets/icons";
import loginPageImage from "../assets/images/illustration-login.png";
import logoDark from "../assets/images/logo-dark.png";
const GridContainer = styled(Grid)({
  height: "100vh",
  "& .MuiTypography-h5": {
    fontWeight: 700,
  },
  "& .MuiTypography-subtitle2": {
    marginBottom: "2.35em",
  },
});

const Img = styled("img")({});
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const setUser = useSetUser();
  const setGlobalError = useSetError();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState([]);
  const [visiblePass, setVisiblePass] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setGlobalError(null);
    dispatch(clearErrors());
  }, [setGlobalError, dispatch]);

  const from = location.state?.from?.pathname || "/";

  const { mutate: login } = useLoginMutation({
    onSuccess: ({ accessToken, user }) => {
      setUser(user);
      localStorage.setItem("accessToken", accessToken);
      history.replace(from);
    },
    onError: (error) => {
      setShowError(true);
      setError(error);
    },
  });

  const handleChange = (e) =>
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            width: "500px",
            margin: "auto",
            mt: -2,
            margin: "0 0 7% 0",
          }}
        >
          <Img
            sx={{ width: "210px", mb: 5 }}
            src={logoDark}
            alt="Rising Stars Logo"
          />
        </Box>
        <Typography variant="h5" component="div">
          Login
        </Typography>

        <>
          <Typography variant="subtitle2" component="div">
            Business User
          </Typography>
          {showError && (
            <Typography
              component="pre"
              sx={{
                fontSize: 12,
                color: "error.main",
                marginBottom: "10px",
              }}
            >
              {transformError(error)}
            </Typography>
          )}
        </>
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          onChange={handleChange}
          InputLabelProps={{ style: { background: "#fff" } }}
          value={credentials.email}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <img
                  src={userIcon}
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
          InputLabelProps={{ style: { background: "#fff" } }}
          name="password"
          type={visiblePass ? "text" : "password"}
          onChange={handleChange}
          value={credentials.password}
          InputProps={{
            endAdornment: (
              <InputAdornment onClick={togglePassVisibility} position="end">
                <IconButton>
                  {visiblePass ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: 4, width: "100%" }}
        />
        <GradientButton
          sx={{
            textTransform: "none",
            width: "25%",
            fontSize: "1rem",
          }}
          onClick={handleSubmit}
        >
          Login
        </GradientButton>
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
        <img
          src={loginPageImage}
          alt="loginPageImage"
          style={{ maxWidth: "100%" }}
        />
      </Grid>
    </GridContainer>
  );
};

export default Login;
