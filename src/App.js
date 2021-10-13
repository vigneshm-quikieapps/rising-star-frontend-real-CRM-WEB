import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/configureStore";

// import MainLayout from "./hoc/main-layout";
import "./styles/global.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>{/* dry run your component inside here */}</MainLayout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

<<<<<<< HEAD
{
  /* <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Pay Month"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <StyledTexField variant="filled" {...params} />
          )}
        />
      </LocalizationProvider>
      <br />
      <br />
      <br />
      <br />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Pay Month"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <StyledTexField variant="outlined" {...params} />
          )}
        />
      </LocalizationProvider>
      <br />
      <br />
      <br />
      <br />
      <StyledCheckbox onChange={handleChange} checked={checked} /> */
}
=======

// display: "flex",
// flexDirection: "row",
// justifyContent: "space-around",

>>>>>>> shubham
