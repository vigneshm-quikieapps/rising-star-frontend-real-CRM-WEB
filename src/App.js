import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/configureStore";
import MemberEnrollment from "./pages/member-enrollments";

import MainLayout from "./hoc/main-layout";
import "./styles/global.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          {/* dry run your component inside here */}
          <MemberEnrollment />
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
