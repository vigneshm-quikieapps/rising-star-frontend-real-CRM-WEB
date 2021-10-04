import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import theme from "../../styles/theme";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";

const MainLayout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Header />
    <Sidebar />
    <main>{children}</main>
    <Footer />
  </ThemeProvider>
);

export default MainLayout;
