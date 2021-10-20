import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/configureStore";
import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
// import Classes from "./pages/classes";
// import PersonalInfo from "./pages/personal-info";
// import Payment from "./pages/Payment";
// import Enrollment from "./pages/enrollment";
import AdvanceSearch from "./pages/advance-search";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          {
            /* dry run your component inside here */
            // <Enrollment />
            // <Classes/>
            // <Attendance/>

            // <Payment/>
            <AdvanceSearch />
          }
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
