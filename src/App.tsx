import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import HistoryPage from "./pages/account/HistoryPage";
import AccountPage from "./pages/account/AccountPage"
import { PrivateRoute } from "./components/PrivateRoute";
import MatchMarkets from "./pages/match/MatchMarkets";
import BetSlipModal from "./components/Bet/BetSlipModal";
import BetsPage from "./pages/bets/BetsPage";


function App() {
  return (
    <>
      
      <Header />
      <BetSlipModal />

      <Routes>
        <Route path="/" element={<Home />} />
       

   

        <Route
          path="/admin"
          element={
            <PrivateRoute roles={["admin"]}>
              <Admin />
            </PrivateRoute>
          }
        />

          <Route
      path="/account"
        element={
      <PrivateRoute>
      <AccountPage />
    </PrivateRoute>
  }
/>

 <Route
      path="/history"
        element={
      <PrivateRoute>
      <HistoryPage/>
    </PrivateRoute>
  }
/>
<Route path="/match/:id" element={<MatchMarkets />} />

<Route
path="/bets"
element={
<PrivateRoute>
<BetsPage />
</PrivateRoute>
}
/>
      </Routes>
    </>
  );

  
}

export default App;