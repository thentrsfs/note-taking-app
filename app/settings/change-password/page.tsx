'use client'
import { useState, useContext } from 'react';
import { createSupabaseClient } from '@/app/lib/supabase/client';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/ui/TextInput';
import IconShowPassword from '@/components/ui/svg/IconShowPassword';
import IconHidePassword from '@/components/ui/svg/IconHidePassword';
import PrimaryButton from '@/components/ui/buttons/PrimaryButton';
import { ToastContext } from '@/context/ToastContext';
const ChangePassword = () => {
  const supabase = createSupabaseClient;
  const router = useRouter();
  const { setToastText, setToastVisible, } = useContext(ToastContext);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNewPasswordError('');
    setConfirmPasswordError('');

    if(newPassword.length < 8) {
      setNewPasswordError('Password must be at least 8 characters');
      return;
    }
    
    if(!newPassword) {
      setNewPasswordError('Password is required');
      return;
    }

    if(!confirmPassword) {
      setConfirmPasswordError('Password is required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setTimeout(() => setError(''), 2500);
      return;
    }

    const {error} = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) {
      setError(error.message);
setTimeout(() => setError(''), 2500);
    } else {
      setToastText('Password changed successfully');
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2500);
      setNewPassword('');
      setConfirmPassword('');
      router.push('/');
    }
}

  return (
    <div className="flex flex-col gap-3">
        <button className="flex items-center gap-1"><svg className="fill-neutral-600 dark:fill-neutral-300" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fillRule="evenodd" d="M15.75 20.414 7.336 12l8.414-8.414L17.164 5l-7 7 7 7-1.414 1.414Z" clipRule="evenodd"/></svg>
    <span className="text-preset-5 text-neutral-600 dark:text-neutral-300" onClick={() => router.back()}>Settings</span>
    </button>
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
    <h1 className="text-preset-1 text-neutral-950 dark:text-white">Change Password</h1>
    <div className='flex flex-col gap-0.5'>
    <label className='text-preset-4 dark:text-white text-neutral-950' htmlFor="new-password" >New Password</label>
    <TextInput error={Boolean(newPasswordError)} value={newPassword} handleChange={(e) => setNewPassword(e.target.value)} id='new-password' name='new-password' type={showNewPassword ? 'text' : 'password'} hint='At least 8 characters' afterIcon={ <button type='button' onClick={() => setShowNewPassword(!showNewPassword)}>{ showNewPassword ? <IconHidePassword className='stroke-neutral-500 fill-transparent cursor-pointer' /> : <IconShowPassword className='fill-neutral-500 cursor-pointer' />}</button>} />
    </div>
    <div className='flex flex-col gap-0.5'>
    <label className='text-preset-4 dark:text-white text-neutral-950' htmlFor="confirm-password" >Confirm New Password</label>
    <TextInput error={Boolean(confirmPasswordError)} value={confirmPassword} handleChange={(e) => setConfirmPassword(e.target.value)} id='confirm-password' name='confirm-password' type={showConfirmPassword ? 'text' : 'password'} afterIcon={ <button type='button' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{ showConfirmPassword ? <IconHidePassword className='stroke-neutral-500 fill-transparent cursor-pointer' /> : <IconShowPassword className='fill-neutral-500 cursor-pointer' />}</button>} />
    </div>
<PrimaryButton className='self-end' type='submit'>Save Password</PrimaryButton>
    </form>
   {error && <span className="text-red-500 dark:text-red-500 text-preset-5 absolute bottom-20 left-[50%] translate-x-[-50%]">{error}</span>}
    </div>
  )
}

export default ChangePassword