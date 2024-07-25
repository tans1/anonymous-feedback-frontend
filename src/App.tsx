import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Admin from "./pages/admin-auth";
import Users from "./pages/users-feedback";
import { ClientJS } from "clientjs";
import { Toaster } from "@/components/ui/sonner";
import styles from "./background.module.css";

function App() {
  const client = new ClientJS();
  const fingerprint = client.getFingerprint();

  return (
    <>
        <div className={styles.content} />
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route
            path="/feedback/:postId"
            element={<Users fingerprint={fingerprint} />}
          />
          <Route path="/admin" element={<Admin fingerprint={fingerprint} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
