import TopBar from "@components/TopBar";
import Sidebar from "@components/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Sales from "@pages/Sales";
import Engagement from "@pages/Engagement";
export default function App() {
  return (
    <div>
      <TopBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: 16 }}>
          <Routes>
            <Route path='/' element={<Navigate to='/sales' replace />} />
            <Route path='/sales' element={<Sales />} />
            <Route path='/engagement' element={<Engagement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
