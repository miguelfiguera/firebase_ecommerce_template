import { cookies } from "next/headers";
import { auth } from '@/lib/firebase/firebase'
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth as adminAuth } from "firebase-admin";
import { NextRequest } from "next/server";

type logOutCookie = {
    name: string,
    value: string,
    maxAge: number
}

type userCredentials = {
    email: string,
    password: string
}

export async function createSession(credentials: userCredentials): Promise<void> {

    try {
        const user = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        const idToken = await user.user.getIdToken()
        const decodedToken = await adminAuth().verifyIdToken(idToken)
        if (!decodedToken) {
            throw new Error('Something went really wrong...')
        }
        if (decodedToken) {
            const expiresIn = 60 * 60 * 24 * 5 * 1000;
            const sessionCookie = await adminAuth().createSessionCookie(idToken, {
                expiresIn,
            });
            const options = {
                name: "session",
                value: sessionCookie,
                maxAge: expiresIn,
                httpOnly: true,
                secure: true,
                //sameSite: "strict",
            }
            cookies().set(options)
        }
        console.log("Session Initiated,", decodedToken)
        console.log("Status: 200")
    } catch (error) {
        console.log(error)
        console.log("Status: 401")
    }

}


export async function validateSession(req: NextRequest):Promise<boolean>{
    const session = cookies().get('session')

    if(!session){return false}

    const verifiedCookie= await adminAuth().verifySessionCookie(session.value,true)

    if(!verifiedCookie){
        return false
    }



    return true


}

export async function serverLogOut(): Promise<void> {
    const options: logOutCookie = {
        name: "session",
        value: "",
        maxAge: -1,
    }
    cookies().set(options)
    console.log('Session Terminated.')
    console.log('Status: 200')

    return
}