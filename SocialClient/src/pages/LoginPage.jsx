import { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../Context/AuthContext';

const LoginPage = () => {

  const [currentSet, setCurrentSet] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [dataSubmitted, setDataSubmitted] = useState(false); 

  const {login} = useContext(AuthContext);

  const SubmitHandler = async (e)=> {
    e.preventDefault()

    if(currentSet === "Sign Up" && !dataSubmitted){
      setDataSubmitted(true)
      return;
    }

    login(currentSet === "Sign Up" ? 'signup' : 'login' , {fullName, email, password, bio});

  }

  return (
    <div className='min-h-screen bg-cover flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* left side  */}
      <div className='items-center'>
        <img src="src\assets\go_chat.png" alt="" className='w-[min(30vw,250px)]'/>
        <p className='text-5xl font-bold items-center text-gray-200 p-2'>ZapTalk</p>
      </div>     

      {/* right side  */}
      <form onSubmit={SubmitHandler} className='border-2 bg-white/8 text-white border-gray-600 p-6 flex flex-col gap-5 rounded-lg shadow-lg'>
        <h1 className='flex font-medium text-2xl justify-between items-center'>
          {currentSet}
          {dataSubmitted && 
            <img onClick={()=> setDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer'/>
          }
        </h1>

        {currentSet === "Sign Up" && !dataSubmitted && (
        <input onChange={(e)=> setFullName(e.target.value)} value={fullName} 
        type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Enter Your Name' required/>
        )}

        {!dataSubmitted && (
          <>
            <input onChange={(e)=> setEmail(e.target.value)} value={email}
            type="email" placeholder='Email address......' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
            <input onChange={(e)=> setPassword(e.target.value)} value={password}
            type="password" placeholder='Password......' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
          </>
        )}

        {currentSet === "Sign Up" && dataSubmitted && (
            <textarea onChange={(e)=>setBio(e.target.value)} value={bio} 
            rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            placeholder='Write a short Bio.....' required></textarea>
        )}

        <div className='flex items-center gap-2 text-gray-300 text-sm'>
          <input type="checkbox" required/>
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <button type='submit' className='py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-md cursor-pointer'>
          {currentSet === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className='flex flex-col gap-2'>
          {currentSet === "Sign Up" ? (
            <p className='text-sm text-gray-300 ml-[9%]'>Already have an acoount? <span onClick={()=>{setCurrentSet("Login"); setDataSubmitted(false)}} className='font-medium text-purple-400 cursor-pointer'>Login here</span>
            </p>
          ) : (
            <p className='text-sm text-gray-300 ml-[18%]'>create an account? <span onClick={()=>setCurrentSet("Sign Up")} className='font-medium text-purple-400 cursor-pointer'>Cick here</span>
            </p>
          )}
        </div>

      </form>
    </div>
  )
}

export default LoginPage