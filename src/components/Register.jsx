import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseconfiguration/config';
import './Register.css';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

            // Update profile with display name
            await updateProfile(userCredential.user, {
                displayName: formData.fullName
            });

            navigate('/home');
        } catch (err) {
            console.error("Registration error:", err);
            if (err.code === 'auth/operation-not-allowed') {
                setError("Email/Password login is not enabled in Firebase Console.");
            } else if (err.code === 'auth/email-already-in-use') {
                setError("Email is already in use.");
            } else if (err.code === 'auth/weak-password') {
                setError("Password is too weak.");
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setError(null);
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/home');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <div className="floating-shapes">
                <div className="shape"></div>
                <div className="shape"></div>
                <div className="shape"></div>
            </div>

            <div className="register-container">
                <div className="register-card">
                    <h2 className="register-title">Join Us</h2>

                    {error && <p className="error-msg">{error}</p>}

                    <button onClick={handleGoogleSignUp} className="google-btn">
                        <span>Sign up with Google</span>
                    </button>

                    <div className="auth-separator">
                        <span className="separator-text">OR</span>
                    </div>

                    <form className="register-form" onSubmit={handleRegister}>
                        <div className="input-group">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                className="register-input"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="register-input"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="register-input"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="register-input"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="create-account-btn" disabled={loading}>
                            {loading ? 'Creating...' : 'Register with Email'}
                        </button>
                    </form>

                    <div className="login-link">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
