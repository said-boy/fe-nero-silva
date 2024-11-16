import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function verifyToken(token) {
    try {
        const res = await axios.post(BACKEND_URL + '/verify', {}, {
            headers: {
                'Authorization': token
            }
        });
        return res;
    } catch (error) {
        console.error("Gagal verify token, error:", error);
    }
}

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('authToken');
    const [verificationData, setVerificationData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Menambahkan state untuk loading

    useEffect(() => {
        if (token) {
            const verify = async () => {
                const res = await verifyToken(token);
                setVerificationData(res);
                setIsLoading(false); // Set loading selesai
            };
            verify();
        } else {
            setIsLoading(false);
        }
    }, [token]); // Dependensi pada token, jika token berubah, jalankan useEffect lagi

    // Tampilkan loading jika sedang memverifikasi token
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Jika tidak ada token atau verifikasi gagal, arahkan ke halaman login
    if (!verificationData) {
        return <Navigate to="/auth" replace />;
    }

    if (verificationData.status === 'error') {
        localStorage.removeItem('authToken');
        return <Navigate to="/auth" replace />;
    }

    // Jika token valid, tampilkan children
    return React.cloneElement(children, { verificationData });
};

export default ProtectedRoute;
