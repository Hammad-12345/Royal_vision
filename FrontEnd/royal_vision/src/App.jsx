import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Component/Layout";
import Home from "./Pages/Home";
import News from "./Pages/News";
import Contactus from "./Pages/Contactus";
import Aboutus from "./Pages/Aboutus";
import Plans from "./Pages/Plans";
import "./App.css";
import Faqs from "./Pages/Faqs";
import Policy from "./Pages/Policy";
import HowitsWorks from "./Pages/HowitsWorks";
import Login from "./Pages/Login";
import AuthLayout from "./Component/AuthLayout";
import Register from "./Pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import UserDashboardLayout from "./UserDashboard/UserDashboardLayout";
import Dashboard from "./UserDashboard/Pages/Dashboard";
import Deposit from "./UserDashboard/Pages/Deposit";
import Withdraw from "./UserDashboard/Pages/Withdraw";
import InvestmentPlans from "./UserDashboard/Pages/InvestmentPlans";
import InvestmentHistory from "./UserDashboard/Pages/InvestmentHistory";
import Wallet from "./UserDashboard/Pages/Wallet";
import Account from "./UserDashboard/Pages/Account";
function App() {
  const token = useSelector((state) => state.Token.DashboardRoutes);
  console.log(token);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          {!token ? (
            <>
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
              <Route path="/" element={<AuthLayout />}>
                <Route path="signin" element={<Login />} />
                <Route path="signup" element={<Register />} />
              </Route>
            </>
          ) : (
            <>
            <Route path="/" element = {<UserDashboardLayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path="Deposit" element={<Deposit/>}/>
            <Route path="Withdraw" element={<Withdraw/>}/>
            <Route path="Plans" element={<InvestmentPlans/>}/>
            <Route path="investment-history" element={<InvestmentHistory/>}/>
            <Route path="wallet" element={<Wallet/>}/>
            <Route path="account" element={<Account/>}/>
            </Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
