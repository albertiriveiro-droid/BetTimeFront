import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <>
      {/* Header siempre visible */}
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
      </Routes>
    </>
  );
}

export default App;