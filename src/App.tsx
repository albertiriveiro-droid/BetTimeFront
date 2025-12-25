import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import HistoryPage from "./pages/account/HistoryPage";
import AccountPage from "./pages/account/AccountPage"
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <>
      
      <Header />

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
      </Routes>
    </>
  );
}

export default App;