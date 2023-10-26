import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Subscription from "./pages/Subscription";
import Login from "./pages/Login";
import ProtectedRoutes from "./middleware/ProtectedRoutes";
import AuthorPersonalPage from "./pages/AuthorPersonalPage";
import MyNav from "./components/navbar/MyNav";
import Success from "./pages/Success";

function App() {
  return (
    <>
    <MyNav/>
    <BrowserRouter>
      <Routes>

        <Route exact path="/" element={<Login />} />
        <Route path="/success" element={<Success />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/newblog" element={<New />} />
          <Route path="/authorpage" element={<AuthorPersonalPage/>}/>
        </Route>

        <Route path="/newauthor" element={<Subscription />} />
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
