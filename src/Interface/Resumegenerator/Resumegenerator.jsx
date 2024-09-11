import React, { useState } from 'react';
import { Input, Upload, Button, message, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import Educationaldetails from '../Resumegenerator2/Educationaldetails';
import Skills from '../Skills/Skills';
import Miniproject from '../MiniProject/Miniproject';
import Social from '../Social/Social';
import '../Resumegenerator/Resumegenerator.css'
import { useResumeGenerator } from '../../UseCases/UseResumeGenerator/useResumeGenerator';
import { useNavigate } from 'react-router-dom';
export default function Resumegenerator() {
  const { currentstate, handleBack, handleNextStep, isBackDisabled, isNextDisabled, handleNewPage } = useResumeGenerator();
  const navigate = useNavigate()
  // Profile form state
  const [form, setForm] = useState({
    firstname: '',
    secondname: '',
    number: '',
    address: '',
    email: ''
  });

  // Educational form state
  const [form1, setForm1] = useState({
    coursename: '',
    completionyear: '',
    college: '',
    percentage: ''
  });

  // Skills form state
  const [skills, setSkills] = useState('');

  const [projects, setProjects] = useState([])

  const [sociallink, setSociallink] = useState(['']);

  const uploadProps = {
    name: 'file',
    action: '/upload.do',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleEducationalChange = (e) => {
    const { name, value } = e.target;
    setForm1({
      ...form1,
      [name]: value
    });
  };

  const handleSkillChange = (e) => {
    setSkills(e.target.value);
  };

  const handleNext = async () => {
    try {
      if (currentstate === 1) {
        await axios.post('http://localhost:5000/profiles', form);
        console.log(form, 'Profile Form Submit value');
        handleNextStep();
      } else if (currentstate === 2) {
        await axios.post('http://localhost:5000/Educationaldetails', form1);
        console.log(form1, 'Educational Form Submit value');
        handleNextStep();
      } else if (currentstate === 3) {
        await axios.post('http://localhost:5000/Skills', { input: skills });
        console.log(skills, 'Skill Form Submit value');
        handleNextStep();
      } else if (currentstate === 4) {
        await axios.post('http://localhost:5000/MiniProject', projects);
        console.log(projects, 'Projects Form Submit value');
        handleNextStep();
      } else if (currentstate === 5) {
        await axios.post('http://localhost:5000/SocialLinks', sociallink);
        console.log(sociallink, 'Social Links Form Submit value');
        handleNewPage()
      }
    } catch (error) {
      console.error('Error Fetching Data', error);
    }
  };


  const stepNames = [
    "Add your Profile Detail",
    "Educational Details",
    "Skills",
    "Mini Project",
    "Social Links"
  ];

  const progressPercentage = (currentstate / stepNames.length) * 100;

  return (
    <div className='main'>
      <div className="resume">
        <h1>Resume Generator</h1>
      </div>
      <div className="progress-container">
        <h2 className="step-title">{stepNames[currentstate - 1]}</h2>
        <div className="progress-bar">
          <Progress
            percent={progressPercentage}
            strokeColor={{ '0%': '#e11d48', '100%': '#fcbf49' }}
            trailColor="#e4e4e4"
            strokeWidth={20}
            showInfo={false}
          />
          <div className="step-indicators">
            {stepNames.map((name, index) => (
              <div key={index} className={`step-indicator ${index + 1 === currentstate ? 'active' : ''}`}>
                <span>{index + 1}</span>
                <p>{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="data">
        {currentstate === 1 && (
          <div className="main-1">
            <div className="detail">
              Add your Profile Detail
            </div>
            <div className="detailing">
              <div className="detailing1">
                <Input
                  name="firstname"
                  placeholder="Enter your FirstName"
                  style={{ width: '400px', height: '50px' }}
                  value={form.firstname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="detailing2">
                <Input
                  name="secondname"
                  placeholder="Enter your SecondName"
                  style={{ width: '400px', height: '50px' }}
                  value={form.secondname}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="detailing">
              <div className="detailing1">
                <Input
                  name="number"
                  placeholder="Phone Number"
                  style={{ width: '400px', height: '50px' }}
                  value={form.number}
                  onChange={handleInputChange}
                />
              </div>
              <div className="detailing2">
                <Input
                  name="address"
                  placeholder="Address"
                  style={{ width: '400px', height: '50px' }}
                  value={form.address}
                  onChange={handleInputChange}
                />
              </div>     <Input
                name="email"
                placeholder="Email"
                style={{ width: '100%', height: '50px' }}
                value={form.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="detailing">
              <div className="detailing3">
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </div>
            </div>
          </div>
        )}
        {currentstate === 2 && (
          <Educationaldetails
            handleEducationalChange={handleEducationalChange}
            form1={form1}
            setForm1={setForm1}
          />
        )}
        {currentstate === 3 && (
          <Skills
            handleSkillChange={handleSkillChange}
            skills={skills}
            setSkills={setSkills}
          />
        )}
        {currentstate === 4 && (
          <Miniproject
            projects={projects}
            setProjects={setProjects}
          />
        )}
        {currentstate === 5 && (
          <Social
            sociallink={sociallink}
            setSociallink={setSociallink}
          />
        )}
      </div>
      <div className="btn">
        <Button style={{ margin: '10px', color: 'black', height: '40px' }} onClick={handleBack} disabled={isBackDisabled}>
          Back
        </Button>
        <Button style={{ backgroundColor: '#e11d48', margin: '10px', color: 'white', height: '40px' }} onClick={handleNext} disabled={isNextDisabled} >
          Next
        </Button>
        {currentstate === 5 && (
          <Button style={{ backgroundColor: '#e11d48', margin: '10px', color: 'white', height: '40px' }} onClick={handleNext}>
            Save and Continue
          </Button>
        )}
      </div>
    </div>
  );
}