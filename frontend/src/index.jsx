import reactDOM from "react-dom/client"
import App from "./App"
import Navbar from './componants/Navbar'
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import 'bootstrap/dist/css/bootstrap.min.css';

reactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Toaster />
      <Navbar />
      <App />
    </BrowserRouter>


);
