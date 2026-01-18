import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseconfiguration/config";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import './Register.css'; // Reusing the same styles

export default function UserLogin() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    async function signIn() {
        try {
            setError(null);
            await signInWithPopup(auth, googleProvider);
            navigate('/home');
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message);
        }
    }

    return (
        <>
            <div className="floating-shapes">
                <div className="shape"></div>
                <div className="shape"></div>
                <div className="shape"></div>
            </div>

            <div className="register-container">
                <div className="register-card">
                    <h2 className="register-title">Welcome Back</h2>

                    {error && <p className="error-msg">{error}</p>}

                    <div style={{ marginTop: '20px' }}>
                        <button onClick={signIn} className="google-btn" style={{ width: '100%', justifyContent: 'center' }}>
                            <span>Login with Google</span>
                        </button>
                    </div>

                    <div className="login-link">
                        Don't have an account? <Link to="/">Register</Link>
                    </div>
                </div>
            </div>
        </>
    );
}