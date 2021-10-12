import { BrowserRouter } from "react-router-dom";

import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import Classes from "./containers/class-list";
// import Notifications from "./components/notifications";
// import { Box } from "@mui/system";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
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
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
