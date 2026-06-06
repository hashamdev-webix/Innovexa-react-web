import MainLayout from "./layout/MainLayout";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Approute";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;