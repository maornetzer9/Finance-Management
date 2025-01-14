import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import DrawerModal from "./components/UI/DrawerModal";
import Login from "./components/Login";
import Register from "./components/Register";
import './App.css'

function App() {
    return (
        <>
            <Routes>
                {/* Public routes without Drawer */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Private routes with Drawer */}
                {/* <Route element={<DrawerModal />}> */}
                    <Route
                        path="/dashboard"
                        element={<PrivateRoute element={Dashboard} />}
                    />
                {/* </Route> */}
 
                {/* Default route */}
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </>
    );
}

export default App;
