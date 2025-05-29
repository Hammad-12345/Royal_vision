import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
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
import Referal from "./UserDashboard/Pages/Referal";
import Withdrawhistory from "./UserDashboard/Pages/Withdrawhistory";
import AdminDashboardLayout from "./AdminDashboard/AdminDashboardLayout";
import AdminDashboard from "./AdminDashboard/Pages/Dashboard";
import AdminUsers from "./AdminDashboard/Pages/Users";
import AdminInvestments from "./AdminDashboard/Pages/Investments";
import AdminProfits from "./AdminDashboard/Pages/Profits";
import AdminWithdrawals from "./AdminDashboard/Pages/Withdrawals";
import ScrollToTop from "./Component/ScrollToTop";
import ReferalUser from "./AdminDashboard/Pages/ReferalUser";
// import GoldTradingHistory from "./UserDashboard/Pages/GoldTradingHistory";
// import Airbnbhistory from "./UserDashboard/Pages/Airbnbhistory";
// import Amazonhistory from "./UserDashboard/Pages/Amazonhistory";
// import MineralWater from "./UserDashboard/Pages/MineralWater";
// import Retrodrops from "./UserDashboard/Pages/Retrodrops";
// import PlansDashboard from "./UserDashboard/Pages/PlansDashboard";

// Add this component above the App component
const SignupWithReferral = () => {
  const { referralCode } = useParams();
  console.log(referralCode);
  return <Register referralCode={referralCode} />;
};

function App() {
  const token = useSelector((state) => state.Token.DashboardRoutes);
  const userdetail = useSelector((state) => state.Token.userDetail);
  console.log(userdetail);
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
        <ScrollToTop />
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

            {token && userdetail?.Role === "user" && (
              <>
                {/* // <Route path="/" element={<UserDashboardLayout />}> */}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="Deposit" element={<Deposit />} />
                <Route path="Deposit/:id" element={<Deposit />} />
                <Route path="Withdraw" element={<Withdraw />} />
                <Route path="Plans" element={<InvestmentPlans />} />
                <Route
                  path="investment-history"
                  element={<InvestmentHistory />}
                />
                {/* <Route path="goldhistory" element={<GoldTradingHistory/>}/>
            <Route path="airbnbhistory" element={<Airbnbhistory/>}/>
            <Route path="amazonhistory" element={<Amazonhistory/>}/>
            <Route path="mineralwaterhistory" element={<MineralWater/>}/>
            <Route path="retrodropshistory" element={<Retrodrops/>}/> */}
                <Route path="wallet" element={<Wallet />} />
                <Route path="referal" element={<Referal />} />
                <Route path="withdrawhistory" element={<Withdrawhistory />} />
                <Route path="account" element={<Account />} />
                {/* </Route> */}
              </>
            )}
          </Route>

          {/* Admin Routes */}
          {token && userdetail?.Role === "admin" && (
            <>
              <Route path="/admin" element={<AdminDashboardLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="investments" element={<AdminInvestments />} />
                <Route path="profits" element={<AdminProfits />} />
                <Route path="withdrawals" element={<AdminWithdrawals />} />
                <Route path="referal" element={<ReferalUser />} />
              </Route>
            </>
          )}

          {!token && (
            <Route path="/" element={<AuthLayout />}>
              <Route path="signin" element={<Login />} />
              <Route path="signup" element={<Register />} />
              {/* Redirect /signup?ref=XXX to the signup page */}
              <Route
                path="signup/ref/:referralCode"
                element={<SignupWithReferral />}
              />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
