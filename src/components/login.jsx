import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../firebaseconfiguration/config";
import { useNavigate } from "react-router-dom";

export default function login() {
    const navigate = useNavigate()
    async function signIn() {
        await signInWithPopup(auth, googleProvider);
        navigate('/home')
    }
    return (
        <button onClick={signIn}>Login with google </button>
    )
}