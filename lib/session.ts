'use server'
import {SignJWT, jwtVerify, JWTPayload} from "jose";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {getUserById} from "@/lib/users";
import {User} from "@/types/types";

const rawKey = process.env.SECRET;

if (!rawKey) {
    throw new Error("Missing SECRET in environment variables");
}

 const key = new TextEncoder().encode(rawKey);

const cookieConfig = {
    name:'session',
    options:{httpOnly:true,secure:true,sameSite:'lax' as const,path:'/'},
    duration:24*60*60*1000,
}

export async function encrypt(payload:JWTPayload):Promise<string>{
    return new SignJWT(payload)
        .setProtectedHeader({alg:"HS256",})
        .setIssuedAt()
        .setExpirationTime('1day')
        .sign(key)
}

export async function decrypt(session:string){
    try{
        const {payload} = await jwtVerify(session,key,{
            algorithms:['HS256'],
        })
        return payload
    }
    catch(e){
        return null
    }
}


export async function createSession(userId:number) {
    const expires = new Date(Date.now() + cookieConfig.duration)
    const session = await encrypt({userId,expires});
    (await cookies()).set(cookieConfig.name, session,{...cookieConfig.options,expires})


}

export async function verifySession( ){
    const sessionCookie = (await cookies()).get(cookieConfig.name)?.value;
    const session = await decrypt(sessionCookie!)
    if(!session?.userId){
        redirect("/login")
    }
    return {userId:session.userId}

}

export async function getSessionUser(): Promise<User | null> {
    const sessionCookie = (await cookies()).get(cookieConfig.name)?.value;
    const session = await decrypt(sessionCookie ?? "");

    if (!session?.userId || typeof session.userId !== "number") {
        return null; // ⛔ NIE redirectuj – pozwól frontendowi zareagować
    }

    const user = await getUserById(session.userId);
    return user ?? null;
}


export async function deleteSession() {
    (await cookies()).delete(cookieConfig.name)
    redirect("/login")

}