import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import './App.css'

function App() {
    return (
        <>
            <Routes>
                {/* Public routes without Drawer */}
                <Route path="/register" element={<Register />} />

                {/* Private routes with Drawer */}
                    <Route
                        path="/dashboard"
                        element={<PrivateRoute element={Dashboard} />}
                    />
                {/* </Route> */}
 
                {/* Default route */}
                <Route path="/" element={<Login/>} />
            </Routes>
        </>
    );
}

export default App;
