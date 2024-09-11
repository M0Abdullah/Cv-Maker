import React from 'react';
import { Input, Button } from 'antd';
import './Miniproject.css';

export default function Miniproject({ projects, setProjects }) {

    // Function to add a new project to the list
    const addProject = () => {
        setProjects([...projects, { key: Date.now(), name: '', tech: '', description: '' }]);
    };

    // Function to handle changes to the project details
    const handleProjectChange = (key, field, value) => {
        const newProjects = projects.map(project =>
            project.key === key ? { ...project, [field]: value } : project
        );
        setProjects(newProjects);
    };

    return (
        <div className="miniproject-container">
            <div className="detail">Add your Mini Project</div>

            {/* Dynamic Inputs for Multiple Projects */}
            {projects.map(project => (
                <div key={project.key} className="project-fields">
                    <Input
                        placeholder="Project Name"
                        className="input-field"
                        value={project.name}
                        onChange={(e) => handleProjectChange(project.key, 'name', e.target.value)}
                    />
                    <Input
                        placeholder="Tech Stack"
                        className="input-field"
                        value={project.tech}
                        onChange={(e) => handleProjectChange(project.key, 'tech', e.target.value)}
                    />
                    <Input
                        placeholder="Description"
                        className="input-field full-width"
                        value={project.description}
                        onChange={(e) => handleProjectChange(project.key, 'description', e.target.value)}
                    />
                </div>
            ))}
            <Button type="dashed" onClick={addProject} className="add-project-button">
                Add More Project
            </Button>
        </div>
    );
}