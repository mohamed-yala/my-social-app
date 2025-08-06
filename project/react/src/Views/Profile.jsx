import React from 'react'
import '../Styles/Profile.css'
import { useStateContext } from '../contexts/ContextProvider'

function Profile() {

  const {user}=useStateContext()

  return (
    <div className='userProfile container'>

       <div className='profileCon'>
         <img src='/assets/847969.png'></img>

         <div className='profileInfo'>

            <div className='profileName'>{user.name}</div>
            
            <div className='btns'>
                <button>Edit</button>
                <button>Post</button>
            </div>

            <div className='activity'>
                <p><span>0</span> posts</p>
                <p><span>0</span> Followers</p>
                <p><span>0</span> Following</p>
            </div>

            <div className='bio'>
                flowers without rain and men without pain never grow 
            </div>

         <form>
                <label class="radio-container">Public
                 <input type="radio" name="choice" />
                 <span class="checkmark"></span>
              </label>

              <label class="radio-container">Private
                  <input type="radio" name="choice"/>
                  <span class="checkmark"></span>
             </label>
        </form>



         </div>

       </div>

    </div>
  )
}

export default Profile