import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Photos from "./pages/Photos.jsx";
import PhotoView from "./pages/PhotoView.jsx";

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/photos" element={<Photos />} />
                <Route path="/photos/:side" element={<Photos />} />
                <Route path="/photos/view" element={<PhotoView />} />
            </Route>
        </Routes>
    );
}
