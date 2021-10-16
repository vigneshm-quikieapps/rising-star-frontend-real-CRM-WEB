import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/configureStore";
import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import PersonalInfo from "./pages/personal-info";
import Attendance from "./pages/attendance";
import Enrollment from "./pages/enrollment";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          {
            /* dry run your component inside here */
            <PersonalInfo />
          }
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
