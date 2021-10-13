import { BrowserRouter } from "react-router-dom";

import MainLayout from "./hoc/main-layout";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>{/* dry run your component inside here */}</MainLayout>
    </BrowserRouter>
  );
}

export default App;
