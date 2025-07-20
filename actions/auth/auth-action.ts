'use server';

import bcrypt from "bcrypt";
import {createUser, getUserByEmail} from "@/lib/users";
import {redirect} from "next/navigation";
import {createSession} from "@/lib/session";
export interface SignupFormState {
    success: boolean;
    errors?: {
        email?: string ;
        password?: string ;
        name?: string ;
        surname?: string ;
    };
    message?: string;
}

export async function signup(
    prevState: SignupFormState,
    formData: FormData
) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;

    let errors: SignupFormState["errors"] = {};

    if (!name || name.trim() === "") {
        errors.name = "Please enter name.";
    }
    if (!surname || surname.trim() === "") {
        errors.surname = "Please enter surname.";
    }


    if (!email || email.trim() === "") {
        errors.email = "Please enter email.";
    } else if (!email.includes("@")) {
        errors.email = "Please enter a valid email address.";
    }

    if (!password || password.trim() === "") {
        errors.password = "Please enter password.";
    } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
    }


    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            errors,
            message: "Please fix the form errors.",
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
       const userId = await createUser(email, hashedPassword,name,surname)
        await createSession(userId)

    } catch (err:any) {
        if(err.code === 'SQLITE_CONSTRAINT_UNIQUE'){
            return {
                errors:{
                    email:'It seems like an account for the chosen email already exists!',
                    password:undefined
                }
            }
        }
        throw err;
    }
    return {
        success: true,
        errors: {},
        message: 'Signup successful!',
    };

}
interface User {
    id: number;
    email: string;
    password: string;
    name:string;
    surname:string
}


export async function signin(prevState: SignupFormState, formData: FormData): Promise<SignupFormState> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;


    const existingUser = await getUserByEmail(email) as User;

    if (!existingUser) {
        return {
            success: false,
            errors: {
                email: 'Could not find user with this email or password.',
            },
            message: 'Login failed.',
        };
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password); // ✅ poprawna kolejność!

    if (!passwordMatch) {
        return {
            success: false,
            errors: {
                password: 'Could not find user with this email or password.',
            },
            message: 'Login failed.',
        };
    }

    await createSession(existingUser.id);

    // ✅ redirect przerwie flow, ale dodaj "return" na wszelki wypadek

    redirect("/shop_page");
    return {
        success: true,
        errors: {},
        message: "Login successful",
    };

}


export async function auth(mode:string,prevState:SignupFormState,formData:FormData){
    console.log("MODE:", mode); // ⬅️ dodaj to!
    if(mode === 'signin'){
       return await signin(prevState,formData);
    }
    return await signup(prevState,formData);
}