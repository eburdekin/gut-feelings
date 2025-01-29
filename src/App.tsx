import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Test from "./pages/Test";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AuthRedirect from "./pages/AuthRedirect";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/auth/redirect" element={<AuthRedirect />} />
        <Route path="/dashboard" element={<p>Dashboard</p>} />
        <Route />
      </Routes>
    </Router>
  );
};
export default App;
