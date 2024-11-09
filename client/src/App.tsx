import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AuthRedirect from "./pages/AuthRedirect";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<p>Home Page</p>} />
        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/auth/redirect" element={<AuthRedirect />} />
        <Route path="/sign-in" element={<p>Dashboard</p>} />
        <Route />
      </Routes>
    </Router>
  );
};
export default App;
