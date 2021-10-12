import { BrowserRouter } from "react-router-dom";
import { HomeOutlined } from "@mui/icons-material";

import MainLayout from "./hoc/main-layout";
import "./styles/global.css";

import IconButton from "./components/icon-button";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        {/* dry run your component inside here */}
        <IconButton>
          <HomeOutlined />
        </IconButton>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
