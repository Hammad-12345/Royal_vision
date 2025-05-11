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
import HowitsWorks from "./Pages/HowitsWorks";
import Login from "./Pages/Login";
import AuthLayout from "./Component/AuthLayout";
import Register from "./Pages/Register";

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
          <Route path="how-it-works" element={<HowitsWorks />} />

          {/* Authentication Routes */}
        </Route>
        <Route path="/" element={<AuthLayout/>}>
        <Route path="signin" element={<Login/>}/>
        <Route path="signup" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
