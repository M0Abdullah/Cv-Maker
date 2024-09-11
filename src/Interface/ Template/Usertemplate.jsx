import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import img from '../../UseCases/Assets/download.jpeg';
import { Select } from 'antd';
import { PDFDownloadLink, Page, Text, View, Document, Image as PDFImage, StyleSheet } from '@react-pdf/renderer';

// Styled components for the layout
const UserTemplateWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f4f4f4;
  margin-top: 15px;
`;

const LeftSection = styled.div`
  width: 35%;
  background-color: #dedede;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RightSection = styled.div`
  width: 65%;
  padding: 20px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.h1`
  font-size: 24px;
  font-weight: bold;
  background-color: #f7965f;
  color: white;
  padding: 10px;
  text-align: center;
  width: 100%;
  margin-top: 40px;
`;

const ContactInfo = styled.p`
  margin: 5px 0;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-top: 20px;
  color: #f7965f;
  border-bottom: 2px solid #f7965f;
`;

const SectionContent = styled.div`
  margin-top: 10px;
`;

const SkillItem = styled.p`
  margin: 5px 0;
`;

const Summary = styled.p`
  margin-top: 10px;
`;

const SocialLink = styled.a`
  display: block;
  color: #007bff;
  margin: 5px 0;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledSelect = styled(Select)`
  width: 100%;

  .ant-select-selector {
    border-radius: 5px;
    border: 1px solid #007bff;
    background-color: #ffffff;
    color: #333;
    padding: 10px 15px;
    font-size: 1.2em;
  }
  .ant-select-arrow {
    color: #007bff;
  }
  .ant-select-selection-item {
    color: #333;
  }
  &:focus .ant-select-selector {
    border-color: #0056b3;
    box-shadow: 0 0 0 2px rgba(38, 143, 255, 0.25);
  }
`;

const DownloadButton = styled.button`
  background-color: #f7965f;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  text-decoration: none;

color:white;

  &:active {
    background-color: #d18b05;
  }
`;
// Parent link wrapper with flex to align the icon and text
const StyledSocialLink = styled.a`
  display: flex;
  align-items: center;
  color: #007bff;
  margin: 5px 0;
  text-decoration: none;
  padding: 5px;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s;

  &:hover {
    background-color: #e6f2ff;
    text-decoration: none;
    transform: scale(1.02);
  }

  &:hover .fa {
    color: #0056b3;
  }
`;

// Wrapper for the social media icon
const SocialIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

// Social media icon style
const SocialIcon = styled.i`
  font-size: 18px;
  color: #007bff;
  transition: color 0.3s ease;
`;

// Text part of the social link
const SocialLinkText = styled.span`
  color: #333;
  font-size: 14px;
  transition: color 0.3s ease;
`;

const ProjectContainer = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  border-bottom: 2px solid #F7965F;
  padding-bottom: 4px;
`;

const ProjectTech = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #555;
  margin-bottom: 5px;
`;

const ProjectDescription = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 10px;
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

// PDF styles
const pdfStyles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: '50%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#F7965F',
    color: 'white',
    padding: 10,
    textAlign: 'center',
  },
  text: {
    margin: 5,
  },
  subHeader: {
    fontSize: 20,
    marginTop: 20,
    color: '#F7965F',
    borderBottom: '2px solid #F7965F',
  },
  listItem: {
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,  // Add spacing between projects
    padding: 10,       // Add padding inside each section
    backgroundColor: '#f9f9f9',  // Light background color for better contrast
    borderRadius: 8,   // Rounded corners for sections
    borderWidth: 1,
    borderColor: '#ddd', // Light border for sections
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',   // Emphasize project name
    color: '#333',
    marginBottom: 5,      // Space between name and next line
  },
  projectTech: {
    fontSize: 16,
    color: '#555',        // Slightly lighter text for tech
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 14,
    color: '#666',        // Even lighter for description
    lineHeight: 20,       // Improve readability
  },
});

// PDF Template component
const PDFTemplate = ({ data }) => {
  const { profiles, Educationaldetails, Skills, MiniProject, SocialLinks } = data;
  const profile = profiles[0] || {};
  const education = Educationaldetails[0] || {};
  const skills = Skills[0]?.input || [];
  const projects = MiniProject || [];
  const socialLinks = SocialLinks || [];

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.section}>
          <PDFImage src={img} style={pdfStyles.profileImage} />
          <Text style={pdfStyles.header}>{profile.firstname ? `${profile.firstname} ${profile.secondname}` : 'Name'}</Text>
          <Text style={pdfStyles.text}>{profile.number || 'Phone Number'}</Text>
          <Text style={pdfStyles.text}>{profile.email || 'Email Address'}</Text>
          {socialLinks.map((link, index) => (
            <Text key={index} style={pdfStyles.text}>
              {link[0]}
            </Text>
          ))}
        </View>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.subHeader}>Summary</Text>
          <Text style={pdfStyles.text}>An experienced developer with expertise in web technologies...</Text>
        </View>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.subHeader}>Tech Skills</Text>
          {skills.map((skill, index) => (
            <Text key={index} style={pdfStyles.text}>{skill}</Text>
          ))}
        </View>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.subHeader}>Mini Projects</Text>
          {MiniProject.map((project, index) => (
            <View key={index} style={pdfStyles.section}>
              {Object.keys(project).map((key) => (
                <View key={key}>
                  <Text>{project[key]?.name || 'No name provided'}</Text>
                  <Text>Technology: {project[key]?.tech || 'No technology provided'}</Text>
                  <Text>Description: {project[key]?.description || 'No description provided'}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.subHeader}>Education</Text>
          <Text style={pdfStyles.text}>{education.college || 'University'} - {education.coursename || 'Degree'} ({education.completionyear || 'Year'})</Text>
        </View>
      </Page>
    </Document>
  );
};

// Main User Template component
export default function UserTemplate() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const responses = await Promise.all([
          fetch('http://localhost:5000/profiles'),
          fetch('http://localhost:5000/Educationaldetails'),
          fetch('http://localhost:5000/Skills'),
          fetch('http://localhost:5000/MiniProject'),
          fetch('http://localhost:5000/SocialLinks')
        ]);
        const [profiles, Educationaldetails, Skills, MiniProject, SocialLinks] = await Promise.all(
          responses.map((res) => res.json())
        );
        setData({ profiles, Educationaldetails, Skills, MiniProject, SocialLinks });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleTemplateChange = (value) => {
    setSelectedTemplate(value);
    navigate(`/${value}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load data: {error.message}</p>;
  }

  if (!data) {
    return null;
  }

  const { profiles, Educationaldetails, Skills, MiniProject, SocialLinks } = data;
  const profile = profiles[0] || {};
  const skills = Skills[0]?.input || [];
  const projects = MiniProject || [];
  const socialLinks = SocialLinks || [];

  return (
    <UserTemplateWrapper>
      <LeftSection>
        <ProfileImage src={img} alt="Profile" />
        <Name>{profile.firstname ? `${profile.firstname} ${profile.secondname}` : 'Name'}</Name>
        <ContactInfo>{profile.number || 'Phone Number'}</ContactInfo>
        <ContactInfo>{profile.email || 'Email Address'}</ContactInfo>
        {SocialLinks.map((socialLink, index) => (
          Object.keys(socialLink).map((key) => (
            key !== 'id' && socialLink[key] && (
              <StyledSocialLink key={`${socialLink.id}-${key}`} href={socialLink[key]} target="_blank" rel="noopener noreferrer">
                <SocialIconWrapper>
                  <SocialIcon className="fa fa-link" /> {/* You can replace this with an appropriate icon */}
                </SocialIconWrapper>
                <SocialLinkText>{socialLink[key]}</SocialLinkText>
              </StyledSocialLink>
            )
          ))
        ))}

        <DownloadButton>

          <PDFDownloadLink  style={{color:'white',listStyle:'none'}} document={<PDFTemplate data={data} />} fileName="user_profile.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
          </PDFDownloadLink>
        </DownloadButton>
      </LeftSection>
      <RightSection>
        <StyledSelect
          onChange={handleTemplateChange}
          showSearch
          placeholder="Select Template"
          value={selectedTemplate}
          options={[
            { value: 'Usertemplate', label: 'Template 1' },
            { value: 'Usertemplate2', label: 'Template 2' },
            { value: 'Usertemplate3', label: 'Template 3' },
            { value: 'Usertemplate4', label: 'Template 4' },
            { value: 'Usertemplate5', label: 'Template 5' },
          ]}
        />
        <SectionTitle>Summary</SectionTitle>
        <Summary>An experienced developer with expertise in web technologies...</Summary>
        <SectionTitle>Tech Skills</SectionTitle>
        <SectionContent>
          {skills.map((skill, index) => (
            <SkillItem key={index}>{skill}</SkillItem>
          ))}
        </SectionContent>
        <SectionTitle>Mini Projects</SectionTitle>
        <SectionContent>
        <ProjectList>
  {projects.map((project, index) => (
    <ProjectContainer key={index}>
      {Object.keys(project).filter(key => key !== 'id').map((key) => {
        const item = project[key];
        return (
          <div key={item?.key || key}>
            <ProjectTitle>{item?.name || 'No name provided'}</ProjectTitle>
            <ProjectTech><strong>Technology:</strong> {item?.tech || 'No technology provided'}</ProjectTech>
            <ProjectDescription><strong>Description:</strong> {item?.description || 'No description provided'}</ProjectDescription>
          </div>
        );
      })}
    </ProjectContainer>
  ))}
</ProjectList>

        </SectionContent>
        <SectionTitle>Education</SectionTitle>
        <SectionContent>
          {Educationaldetails.map((education, index) => (
            <p key={index}>
              <strong>{education.college || 'University'}</strong> - {education.coursename || 'Degree'} ({education.completionyear || 'Year'}) - ({education.percentage || 'Year'})
            </p>
          ))}
        </SectionContent>

      </RightSection>
    </UserTemplateWrapper>
  );
}
