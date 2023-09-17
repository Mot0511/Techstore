import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {app, db} from "./getApp";
import {get, ref, set} from "@firebase/database";

export const signWithGoogle = async (callback: (access: boolean, username: string) => undefined) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    auth.languageCode = 'ru';

    signInWithPopup(auth, provider).then(async (res) => {
        if (res.user.email){
            const email = res.user.email.split('@')[0]
            const userRef = ref(db, `users/${email}`)
            get(userRef).then(async (snap) => {
                if (!snap.val()){
                    await set(userRef, {
                        username: email,
                        email: res.user.email,
                        level: 0,
                    })
                }
                callback(true, email)
            })
        }


    }).catch(err => {
        callback(false, '')
    })
}