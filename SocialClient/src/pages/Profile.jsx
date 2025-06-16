import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../../Context/AuthContext';

const Profile = () => {

  const {authUser, updateProfile} = useContext(AuthContext);

  const[selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio , setBio] = useState(authUser.bio);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!selectedImage){
      await updateProfile({fullName : name , bio});
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = async() =>{
      const baseImage = reader.result;
      await updateProfile({profilePic : baseImage, fullName : name, bio});
      navigate("/");
    } 
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
        <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-200 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
          
          <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
            <h2 className='text-lg text-white'>Profile Details</h2>
            <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
              <input onChange={(e)=>setSelectedImage(e.target.files[0])} type="file" id="avatar" accept='.png , .jpg , .jpeg , .gif' hidden/>
              <img src={selectedImage ? URL.createObjectURL(selectedImage) : assets.avatar_icon} 
              alt="" className= {`w-12 h-12 ${selectedImage && 'rounded-full'}`}/>
              Upload Profile Picture
            </label>
            <input onChange={(e)=> setName(e.target.value)} value={name}
            type="text" required placeholder='Write your name ....' 
            className='p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-puple-500'/>

            <textarea onChange={(e)=> setBio(e.target.value)} value={bio}
            required placeholder='Write profile bio ....' rows={4}
            className='p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-puple-500'></textarea>

            <button type="submit" className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg 
            cursor-pointer'>Save Profile</button>
          </form>
          <img src={authUser?.profilePic || assets.logo_icon} alt="" className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImage && 'rounded-full'}`}/>
        </div>
    </div>
  )
}

export default Profile