import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

export default function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)

            const response = await fetch("https://essential-carin-isara-373532ad.koyeb.app/googlelogin", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: result.user.email, photoURL: result.user.photoURL })
            })
            const data = await response.json()
            dispatch(signInSuccess(data))
            navigate('/')

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <button
            onClick={handleGoogle}
            type='button'
            className='bg-slate-300 p-3 rounded hover:opacity-90 w-full flex items-center justify-center space-x-3'
        >
            {/* Google logo */}
            <img
                src="images\7123025_logo_google_g_icon.png"
                alt="Google Logo"
                className="w-9 h-9"
            />
            <span>Continue with Google</span>
        </button>
    )
}
