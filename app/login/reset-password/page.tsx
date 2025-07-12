'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseClient } from "@/app/lib/supabase/client"
import PrimaryButton from "@/components/ui/buttons/PrimaryButton"
import TextInput from "@/components/ui/TextInput"
import Logo from "@/components/ui/svg/Logo"
import IconShowPassword from "@/components/ui/svg/IconShowPassword"
import IconHidePassword from "@/components/ui/svg/IconHidePassword"
import Loading from "@/components/ui/Loading"

const ResetPassword = () => {
    const router = useRouter()
    const supabase = createSupabaseClient
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
     const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleReset = async () => {
        setError("");
        setLoading(true);
        
        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }
        if(!newPassword || !confirmPassword) {
            setError("Both fields are required");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const {error} = await supabase.auth.updateUser({
            password: newPassword
        })
        if (error) {
            console.log(error)
        } else {
            router.push('/login')
        }
    }

    if (loading) {
        return <Loading />
    }

  return (
    <div className='h-screen dark:bg-neutral-700 bg-neutral-100 items-center justify-center flex'>
    <form className='flex flex-col w-[355px] md:w-[500px] lg:w-[540px] dark:bg-neutral-950 bg-white rounded-xl px-4 md:px-8 py-8 lg:px-12 gap-4 text-preset-5'>
      <div className='flex flex-col items-center gap-5 py-3'>
      <Logo className='dark:fill-white fill-neutral-950' />
      <div className='flex flex-col items-center text-center gap-2'>
      <h1 className='text-preset-1 dark:text-white text-neutral-950'>Reset Your Password</h1>
      <p className=' dark:text-neutral-300 text-neutral-600'>Choose a new password to secure your account.</p>
      </div>
      </div>
      <div className=' flex flex-col gap-0.5 relative'>
      <label className='text-preset-4 dark:text-white text-neutral-950' htmlFor="password" >Password</label>
      <TextInput id='password' name='password' type={showNewPassword ? 'text' : 'password'} hint="At least 8 characters" handleChange={(e) => setNewPassword(e.target.value)} afterIcon={ <button type='button' onClick={() => setShowNewPassword(!showNewPassword)}>{ showNewPassword ? <IconHidePassword className='stroke-neutral-500 fill-transparent' /> : <IconShowPassword className='fill-neutral-500' />}</button>} />
      </div>
      <div className=' flex flex-col gap-0.5 relative'>
      <label className='text-preset-4 dark:text-white text-neutral-950' htmlFor="confirm-password" >Confirm New Password</label>
      <TextInput id='confirm-password' name='confirm-password' type={showConfirmPassword ? 'text' : 'password'} handleChange={(e) => setConfirmPassword(e.target.value)} afterIcon={ <button type='button' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{ showConfirmPassword ? <IconHidePassword className='stroke-neutral-500 fill-transparent' /> : <IconShowPassword className='fill-neutral-500' />}</button>} />
      </div>
      <PrimaryButton handleSubmit={handleReset} type='button'>Send Reset Link</PrimaryButton>
      {error && <p className='text-preset-4 dark:text-white text-neutral-950'>{error}</p>}
    </form>
    </div>
  )
}

export default ResetPassword