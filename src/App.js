import { ThemeProvider } from "@mui/material/styles";

import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import theme from "./styles/theme";
import Classes from "./containers/class-list";
import Notifications from "./components/notifications";
import { Box } from "@mui/system";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Classes />
      {/* <Box sx={{ textAlign: "center" }}>
        <Notifications
          show={true}
          items={[
            "notification 1",
            "notification 2",
            "notification 3",
            "notification 4",
            "notification 5",
            "notification 6",
          ]}
          sx={{ marginLeft: "300px" }}
        ></Notifications>
      </Box> */}
    </ThemeProvider>
  );
}

export default App;
