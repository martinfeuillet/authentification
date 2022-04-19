import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function SignUpModals() {
    const { modalState, toggleModals,signup } = useContext(UserContext);

    const navigate = useNavigate();

    const [validation, setValidation] = useState("");

    const inputs = useRef([]);

    const addInputs = (el) => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el);
        }
    };

    const formRef = useRef(null);

    const handleForm = async (e) => {
        e.preventDefault();

        if (
            (inputs.current[1].value.length || inputs.current[2].value.length) <
            6
        ) {
            setValidation("6 charachters minimum");
            return;
        }
        else if(inputs.current[1].value !== inputs.current[2].value){
            setValidation("Passwords do not match");
            return;
        }

        try {
            const cred = await signup(
                inputs.current[0].value,
                inputs.current[1].value
            )
            formRef.current.reset()
            setValidation("")
            // console.log(cred);
            navigate('/private/private-home')
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setValidation("Email already in use");
            }
            if (error.code === "auth/invalid-email") {
                setValidation("Email invalid");
            }
            
        }

        
    };

    const closeModal = () => {
        setValidation("");
        toggleModals("close");
    }
        

    return (
        <>
            {modalState.signUpModal && (
                <div className="position-fixed top-0 vw-100 vh-100">
                    <div
                        onClick={closeModal}
                        className="w-100 h-100 bg-dark bg-opacity-75"
                    ></div>
                    <div
                        className="position-absolute top-50 start-50 translate-middle"
                        style={{ minWidth: "400px" }}
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Sign Up</h5>
                                    <button
                                        className="btn-close"
                                        onClick={closeModal}
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <form
                                        ref={formRef}
                                        className="sign-up-form"
                                        onSubmit={handleForm}
                                    >
                                        <div className="mb-3">
                                            <label
                                                htmlFor="signUpEmail"
                                                className="form-label"
                                            >
                                                Email adress
                                            </label>
                                            <input
                                                ref={addInputs}
                                                name="email"
                                                required
                                                type="email"
                                                className="form-control"
                                                id="signUpEmail"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label
                                                htmlFor="signUpPwd"
                                                className="form-label"
                                            >
                                                Password
                                            </label>
                                            <input
                                                ref={addInputs}
                                                name="pwd"
                                                required
                                                type="password"
                                                className="form-control"
                                                id="signUpPwd"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label
                                                htmlFor="repeatPwd"
                                                className="form-label"
                                            >
                                                Repeat Password
                                            </label>
                                            <input
                                                ref={addInputs}
                                                name="pwd"
                                                required
                                                type="password"
                                                className="form-control"
                                                id="repeatPwd"
                                            />
                                            <p className="text-danger mt-1">
                                                {validation}
                                            </p>
                                        </div>

                                        <button className="btn btn-primary">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
