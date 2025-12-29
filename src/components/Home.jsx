import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseconfiguration/config";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Set the user if logged in
            } else {
                navigate("/"); // Redirect to login if not logged in
            }
            setLoading(false); // Stop loading once we have a definitive state
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [navigate]);

    async function logout() {
        await signOut(auth);
        navigate('/');
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>Welcome to HomePage</p>
            {user ? (
                <>
                    <p>User Name : {user.displayName}</p>
                    <p>Email : {user.email}</p>
                </>
            ) : (
                <p>No user data available</p>
            )}
            <button onClick={logout}>LogOut</button>
        </div>
    );
}