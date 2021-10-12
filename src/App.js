import { ThemeProvider } from "@mui/material/styles";

// import MainLayout from "./hoc/main-layout";
import "./styles/global.css";
import theme from "./styles/theme";
// import Classes from "./containers/class-list";
import SimpleButton from "./components/simple-button";
import GradientButton from "./components/gradient-button";
// import Payment from "./pages/payment"

function App() {
// const a=<AccountBalanceIcon/>
  return (
    <ThemeProvider theme={theme}>
      {/* dry run your component inside here */}
      <SimpleButton active>
       Button
      </SimpleButton>

      <SimpleButton >
        button
      </SimpleButton>
      <SimpleButton select>
       select
      </SimpleButton>

       <GradientButton>
      GradientButton
      </GradientButton>
      <GradientButton discard >
      GradientButton
      </GradientButton>
      {/* <Payment/> */}

    </ThemeProvider>
  );
}

export default App;


// display: "flex",
// flexDirection: "row",
// justifyContent: "space-around",

