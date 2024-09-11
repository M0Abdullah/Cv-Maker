import React from 'react';
import { Input, Button } from 'antd';
import './Educationaldetails.css';

export default function Educationaldetails({ form1,setForm1 }) {
  const handleEducationalChange = (e) => {
    const { name, value } = e.target;
    setForm1({
      ...form1,
      [name]: value
    });
    
    return{handleEducationalChange};
  };


  return (
    <div className='main-1'>
      <div className="detail">
        Add your Educational Details
      </div>
      <div className="detailing">
        <div className="detailing1">
          <Input
            name='coursename'
            placeholder='Degree Name'
            style={{ width: '100%', height: '50px' }}
            value={form1.coursename}
            onChange={handleEducationalChange}
          />
        </div>
        <div className="detailing2">
          <Input
            name='completionyear'
            placeholder='Completion Year'
            style={{ width: '100%', height: '50px' }}
            value={form1.completionyear}
            onChange={handleEducationalChange}
          />
        </div>
      </div>
      <div className="detailing"  style={{display:'flex'}}> 
        <div className="detailing1">
          <Input
            name='college'
            placeholder='University Name'
            style={{ width: '100%', height: '50px' }}
            value={form1.college}
            onChange={handleEducationalChange}
          />
        </div>
        <div className="detailing2">
          <Input
            name='percentage'
            placeholder='C-GPA'
            style={{ width: '100%', height: '50px' }}
            value={form1.percentage}
            onChange={handleEducationalChange}
          />
        </div>
      </div>
    </div>
  );
}