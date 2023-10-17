import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New"
import Subscription from "./pages/Subscription";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/newblog" element={<New />} />
        <Route path="/newauthor" element={<Subscription />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
