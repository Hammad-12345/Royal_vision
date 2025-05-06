import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Component/Layout";
import Home from "./Pages/Home";
import News from "./Pages/News";
import Contactus from "./Pages/Contactus";
import Aboutus from "./Pages/Aboutus";
import Plans from "./Pages/Plans";
import './App.css'
import Faqs from "./Pages/Faqs";
import Policy from "./Pages/Policy";

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="news" element={<News />} />
          <Route path="contact" element={<Contactus />} />
          <Route path="about" element={<Aboutus />} />
          <Route path="plans" element={<Plans />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="policy" element={<Policy />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
