import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MyContextProvider } from "./Context/MyContext"; // Use named import for MyContextProvider
import {
  AboutPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
} from "./Screens";

function App() {
  return (
    <MyContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/login" element={<LoginPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </MyContextProvider>
  );
}

export default App;
