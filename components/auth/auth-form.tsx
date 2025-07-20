"use client";
import React, {startTransition, useActionState, useEffect} from "react";

import classes from "./authForm.module.css"

import {auth, signup, SignupFormState} from "@/actions/auth/auth-action"

interface SignupData {
    email: string;
    password: string;
}

interface AuthFormState {
    success: boolean;
    errors: {
        email?: string;
        password?: string;
    };
    message: string;
}


const initialState: SignupFormState = {
    success: false,
    errors: {},
    message: "",
};
interface AuthFormProps {
    mode: "signup" | "signin";
}


export default function AuthForm({mode}:AuthFormProps) {

    const [state, formAction, pending] = useActionState<any, FormData>(
        auth.bind(null, mode),
        initialState
    );
    console.log("STATE", state);

    const title = mode === "signup" ? "Sign up" : "Sign in";
    return (
        <div className={classes.auth_form_wrapper}>
            <h2 className={classes.h1}>{title}</h2>

            <form name="auth" style={{ maxWidth: 360 }} action={formAction} className={classes.form}>
                {/* Dodatkowe pola tylko dla signup */}
                {mode === "signup" && (
                    <>
                        <div className={classes.form_control}>
                            <label htmlFor="name">First Name</label>
                            <div className={classes.input_wrapper}>
                                <input id="name" name="name" type="text" placeholder="Name" />
                                {state?.errors?.name && <p>{state.errors.name}</p>}
                            </div>
                        </div>

                        <div className={classes.form_control}>
                            <label htmlFor="surname">Last Name</label>
                            <div className={classes.input_wrapper}>
                                <input id="surname" name="surname" type="text" placeholder="Surname" />
                                {state?.errors?.surname && <p>{state.errors.surname}</p>}
                            </div>
                        </div>
                    </>
                )}
                <div className={classes.form_control}>
                    <label htmlFor="email">Email</label>
                    <div className={classes.input_wrapper}>
                        <input id="email" name="email" type="text" placeholder="Email" />
                        {state?.errors?.email && <p>{state.errors.email}</p>}
                    </div>
                </div>

                <div className={classes.form_control}>
                    <label htmlFor="password">Password</label>
                    <div className={classes.input_wrapper}>
                        <input id="password" name="password" type="password" placeholder="Password" />
                        {state?.errors?.password && <p>{state.errors.password}</p>}
                    </div>
                </div>



                <div className={classes.form_control}>
                    <button disabled={pending} type="submit" className={classes.submit_button}>
                        {pending ? "Submitting..." : title}
                    </button>
                </div>
            </form>
        </div>
    );

}
