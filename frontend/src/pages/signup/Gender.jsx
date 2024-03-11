import React from 'react'

const Gender = ({handleGenderChange , selectedGender}) => {
  return (
    <div className='flex mt-2'>
        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "checked" : ""}`}>
                <span className='label-text'>Male</span>
                <input type='checkbox'
                       className='checkbox 
                       border-slate-900'
                       checked = {selectedGender === "male"}
                       onChange={() => {handleGenderChange("male")}}
                       />
            </label>
        </div>
        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "checked" : ""}`}>
                <span className='label-text'>Female</span>
                <input type='checkbox' 
                       className='checkbox 
                       border-slate-900'
                       checked = {selectedGender === "female"}
                       onChange={() => {handleGenderChange("female")}}
                />
            </label>
            
        </div>
    </div>
  )
}

export default Gender