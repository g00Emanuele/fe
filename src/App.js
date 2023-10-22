import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Subscription from "./pages/Subscription";
import Login from "./pages/Login";
import ProtectedRoutes from "./middleware/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/newblog" element={<New />} />
        </Route>

        <Route path="/newauthor" element={<Subscription />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
