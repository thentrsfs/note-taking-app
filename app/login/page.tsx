'use client'
import { login, signup, loginWithGoogle } from './actions'
import Logo from '@/components/ui/svg/Logo';
import { useState } from 'react';
import TextInput from '@/components/ui/TextInput';
import IconShowPassword from '@/components/ui/svg/IconShowPassword';
import IconHidePassword from '@/components/ui/svg/IconHidePassword';
import PrimaryButton from '@/components/ui/buttons/PrimaryButton';
import BorderButton from '@/components/ui/buttons/BorderButton';
import IconGoogle from '@/components/ui/svg/IconGoogle';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage('');
    setEmailError(null);
    setPasswordError(null);

    if(!email && !password) {
      setEmailError('Email is required');
      setPasswordError('Password is required');
      return;
    }

    if(!email) {
      setEmailError('Email is required');
      return;
    }
    if(!password) {
      setPasswordError('Password is required');
      return;
    }

    const action = isLogin ? login : signup;
    const { error } = await action({ email, password });
    if (error) {
      setError(error);
    } else{
      if(!isLogin) {
        setMessage('Check your email to verify your account');
      }
      window.location.href = '/';
    }
  }

  return (
    <div className='h-screen dark:bg-neutral-700 bg-neutral-100 items-center justify-center flex'>
    <form onSubmit={handleSubmit} className='flex flex-col w-[355px] md:w-[500px] lg:w-[540px] dark:bg-neutral-950 bg-white rounded-xl px-4 md:px-8 lg:px-12 py-8 gap-4 text-preset-5'>
      <div className='flex flex-col items-center gap-5 pt-3'>
      <Logo className='dark:fill-white fill-neutral-950' />
      <div className='flex flex-col items-center text-center gap-2'>
      <h1 className='text-preset-1 dark:text-white text-neutral-950'>{isLogin ? 'Welcome to Note' : 'Create Your Account'}</h1>
      <p className=' dark:text-neutral-300 text-neutral-600'>{isLogin ? 'Please log in to continue' : 'Sign up to start organizing your notes and boost your productivity.'}</p>
      </div>
      </div>
      <div className='flex flex-col gap-4 border-b dark:border-neutral-800 border-neutral-200 py-4'>
      <div className='flex flex-col gap-0.5'>
      <label className='text-preset-4 dark:text-white text-neutral-950' htmlFor="email">Email Address</label>
      <TextInput value={email} handleChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" placeholder='email@example.com' error={Boolean(emailError)} hint={emailError || ''} />
      </div>
      <div className=' flex flex-col gap-0.5 relative'>
      <label className='text-preset-4 dark:text-white text-neutral-950' htmlFor="password" >Password</label>
      {isLogin && <button onClick={() => router.push('/login/forgotten-password')} type='button' className='dark:text-neutral-400 text-neutral-600 text-preset-6 underline absolute right-0 top-0.5 cursor-pointer hover:text-blue-500 transition-all duration-300'>Forgot</button>}
      <TextInput error={Boolean(passwordError)} value={password} handleChange={(e) => setPassword(e.target.value)} id='password' name='password' type={showPassword ? 'text' : 'password'} hint={!isLogin ? 'At least 8 characters' : passwordError && passwordError || ''} afterIcon={ <button type='button' onClick={() => setShowPassword(!showPassword)}>{ showPassword ? <IconHidePassword className='stroke-neutral-500 fill-transparent cursor-pointer' /> : <IconShowPassword className='fill-neutral-500 cursor-pointer' />}</button>} />
      </div>
      <PrimaryButton type='submit'>{isLogin ? 'Login' : 'Sign Up'}</PrimaryButton>
      </div>
      <div className='flex flex-col items-center gap-3 border-b dark:border-neutral-800 border-neutral-200 pb-4'>
      <span className='dark:text-neutral-300 text-neutral-600'>Or log in with:</span>
      <BorderButton type='button' handleSubmit={loginWithGoogle} iconBefore={<IconGoogle className='fill-neutral-950 dark:fill-white' />}> Google</BorderButton>
      </div>
      <p className='dark:text-neutral-300 text-neutral-600 text-center'>{ isLogin ? 'No account yet?' : 'Already have an account?'} <button type='button' onClick={() => setIsLogin(!isLogin)} className='dark:text-white text-neutral-950 hover:text-blue-500 transition-all duration-300 cursor-pointer'>{isLogin ? 'Sign Up' : 'Login'}</button></p>
      {error && <p className='text-red-500 text-preset-6 text-center'>{error}</p>}
      {message && <p className='text-green-500 text-preset-6 text-center'>{message}</p>}
    
    </form>
    </div>
  )
}