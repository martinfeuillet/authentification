import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

export default function Navbar() {
    const { toggleModals } = useContext(UserContext);

    const navigate = useNavigate();

    const logout = async () => {
        try {
            await signOut(auth);
            navigate('/')
        } catch (error) {
            alert('for some reason you can\'t logged out')
        }

    }

    return (
        <nav className="navbar navbar-light bg-light px-4">
            <Link to="/" className="navbar-brand">
                AuthJs
            </Link>
            <div className="">
                <button
                    onClick={() => toggleModals("signUp")}
                    className="btn btn-primary"
                >
                    Sign up
                </button>
                <button
                    onClick={() => toggleModals("signIn")}
                    className="btn btn-primary ms-2"
                >
                    Sign in
                </button>
                <button onClick={logout} className="btn btn-danger ms-2">
                    Log out
                </button>
            </div>
        </nav>
    );
}
