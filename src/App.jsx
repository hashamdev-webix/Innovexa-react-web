import MainLayout from "./layout/MainLayout";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Approute";
import ScrollToTop from "./layout/ScrollOnTop";
function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <ScrollToTop/>
        <AppRoutes />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;