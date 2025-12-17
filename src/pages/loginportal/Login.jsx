

import { Eye, EyeOff, LockKeyhole, Moon, Sun, User } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import NexaLogo from './../../components/Logo';
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import { useState } from 'react';

const Login = () => {
  const { toggleTheme, theme } = useThemeStore();
  const [isLogin, setIsLogin] = useState(true)
  return (
    <div className='w-full relative m-0 p-0 bg-[#5D93B2]'>
      <span className="absolute top-10 md:top-8 right-2 md:right-12">
        <ul className='flex items-center justify-center bg-[#8bc540] shadow-[0_1px_10px_hsla(0,0%,46.7%,.5)] h-6 md:h-12 leading-tight w-6 md:w-12 rounded-md'>
          <li className={`cursor-pointer text-black font-bold leading-3 p-1 text-sm w-5/6 flex items-center justify-center`} onClick={toggleTheme}>
            {theme === 'light' ? <Moon className='w-full' /> : <Sun className='w-full' />}
          </li>
        </ul>
      </span>
      <div className="container flex items-center justify-center flex-col w-full py-8  ">

        <div className={`flex flex-col w-full lg:w-1/2 min-w-[30vw] ${theme == 'light' ? 'bg-white' : 'bg-gray-800'}  rounded-md items-center justify-start py-4 md:px-8 `}>
          <div> <NexaLogo /></div>
          <h2 className='text-xl opacity-65 font-semibold'>{isLogin?"Login to OWE Parent Portal":"Create an RSM Parent Portal Account"}</h2>
          <p className={`${isLogin ? 'block' : 'hidden'} px-2  text-center py-4 text-sm`}>Don't have an OWE Parent Portal Account? <span onClick={()=>setIsLogin(false)} className={` underline cursor-pointer opacity-100 ${theme == 'dark' ? 'text-[#8bc540]' : 'text-[#007698]'}`}>Create an Account</span></p>
          <div className={`form-container px-4 md:px-8 py-4 pt-6 my-4 rounded-md w-full ${theme == 'light' ? 'bg-[#F7F9FA]' : 'bg-gray-700'}`}>
            <p className={`${isLogin ? 'hidden' : 'block'} text-wrap text-sm text-center w-full `}>Don’t forget to verify your email address to get a full access to the Parent Portal.</p>
            <form className="w-full my-4">
              <div className="row mb-2 md:mb-3 flex-col flex gap-5 items-start justify-center w-full">
                <div className={`col justify-center w-full flex gap-3  p-2 border  ${theme == 'light' ? 'border-[#00779867]' : 'border-gray-400'} rounded-md `}>
                  <span className="border-e border-e-gray-400 px-2"> <User className='w-6 text-gray-400 h-6' /></span>
                  <input placeholder='E-mail' className={`outline-none opacity-60 w-full ${theme == 'light' ? 'text-black' : 'text-white'} placeholder:text-gray-400 `} type="email" name="email" id="email" />
                </div>
                <div className={`col justify-center w-full flex gap-3  p-2 border  ${theme == 'light' ? 'border-[#00779867]' : 'border-gray-400'} rounded-md `}>
                  <span className="border-e border-e-gray-400 px-2"> <LockKeyhole className='w-6 text-gray-400 h-6' /></span>
                  <input placeholder="Password" className={`outline-none opacity-60 w-full ${theme == 'light' ? 'text-black' : 'text-white'} placeholder:text-gray-400 `} type="password" name="password1" id="password1" />
                  <span className="text-gray-400 px-2"> <EyeOff className='w-6 text-gray-400 h-6' /></span>
                </div>
                <div className={`col ${isLogin ? 'hidden' : 'block'} justify-center w-full flex gap-3  p-2 border  ${theme == 'light' ? 'border-[#00779867]' : 'border-gray-400'} rounded-md `}>
                  <span className="border-e border-e-gray-400 px-2"> <LockKeyhole className='w-6 text-gray-400 h-6' /></span>
                  <input placeholder="Password" className={`outline-none opacity-60 w-full ${theme == 'light' ? 'text-black' : 'text-white'} placeholder:text-gray-400 `} type="password" name="password2" id="password2" />
                  <span className="text-gray-400 px-2"> <Eye className='w-6 text-gray-400 h-6' /></span>
                </div>
              </div>
              <div className="flex w-full justify-end items-center">
                <div className={` cursor-pointer underline text-[13px] italic opacity-80 ${theme == 'dark' ? 'text-[#8bc540]' : 'text-[#007698]'}`}>
                  {isLogin ? <span>Forgot password?</span> : <span onClick={()=>setIsLogin(true)}>Return to Login</span>}
                </div></div>
              <div className={` w-full text-gray-400 text-[12px] py-4`}>
                <ul className={`flex ${isLogin ? 'hidden' : 'block'} flex-col gap-1 list-disc`}>
                  <li>At least 8 characters</li>
                  <li>A number</li>
                  <li>An uppercase character</li>
                  <li>A lowercase character</li>
                  <li>Passwords match</li>
                </ul>
              </div>
              <div className="flex items-center justify-center w-full">
                <button className={`${theme == 'light' ? 'hover:border-[#6FA728] hover:bg-white hover:text-[#6FA728] bg-[#6FA728] text-white' : 'hover:border-gray-300 bg-white hover:bg-[#6FA728] hover:text-white text-[#6FA728] border-[#6FA728] border-2'} w-full cursor-pointer border-2 font-semibold p-2 uppercase rounded-lg`}>
                  {isLogin ? <span>Login</span> : <span>Create account</span>}
                </button>
              </div>
            </form>
          </div>
          <div className="flex px-4 md:px-0 gap-8 items-center justify-center w-full text-gray-400 opacity-100">
            <hr className="grow w-full border-gray-300" />
            <span className="text-lg text-gray-600 w-fit font-medium">or</span>
            <hr className="grow w-full border-gray-300" />
          </div>
          <div className="flex  flex-col md:flex-row w-full items-center justify-center gap-2 px-8 md:px-4 lg:px-0">
            <div className="flex items-center justify-center w-full">
              <button className={`${theme == 'light' ? 'hover:border-[#007698] hover:bg-white hover:text-[#007698] bg-[#007698] text-white' : 'hover:border-gray-300 bg-white hover:bg-[#007698] hover:text-white text-[.6rem] md:text-sm  text-[#007698] border-[#007698] border-2'} w-full cursor-pointer border-2 font-semibold p-2 rounded-lg flex items-center justify-center gap-1.5 lg:gap-2 `}>
                <FaGoogle className={`w-4 h-4 bg-transparent`} /> <span >Continue with Google</span></button>
            </div>
            <div className="flex items-center justify-center w-full">
              <button className={`${theme == 'light' ? 'hover:border-[#007698] hover:bg-white hover:text-[#007698] bg-[#007698] text-white' : 'hover:border-gray-300 bg-white hover:bg-[#007698] hover:text-white text-[.6rem] md:text-sm  text-[#007698] border-[#007698] border-2'} w-full cursor-pointer border-2 font-semibold p-2 rounded-lg flex items-center justify-center gap-1.5 lg:gap-2`}>
                <FaFacebookSquare className={`w-4 h-4 bg-transparent`} /> <span  >Continue with Google</span></button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
