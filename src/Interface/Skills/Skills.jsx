import React, { useState } from 'react';
import { Input, Button, List } from 'antd';
import './Skills.css';

export default function Skills({ skills, setSkills }) {
    const [newSkill, setNewSkill] = useState('');

    const handleAddSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill(''); // Clear input field
        }
    };

    const handleDeleteAllSkills = () => {
        setSkills([]);
    };

    return (
        <div className='skills-container'>
            <div className="skill">
                Add your skills
            </div>
            <div className="skill2">
                <Input
                    style={{ width: '100%' }}
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder='Enter your Skill'
                />
            </div>
            <div className="skill3">
                <Button onClick={handleDeleteAllSkills}>Delete All Skills</Button>
                <Button
                    type='primary'
                    onClick={handleAddSkill}
                >
                    Add Skill
                </Button>
            </div>
            <div className="skill-list">
                <List
                    size="small"
                    bordered
                    dataSource={skills}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
            </div>
        </div>
    );
}