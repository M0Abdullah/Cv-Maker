import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import img from '../../UseCases/Assets//download (2).jpeg';
import { PDFDownloadLink, Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';


const TemplateContainer = styled.div`
  width: 70%;
  max-width: 1200px;
  margin: 40px auto;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  font-family: 'Roboto', sans-serif;
  color: #333;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px; 
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background-color: #007bff;
  color: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;


const ProfileImage = styled.img`
  width: 100%;
  max-width: 150px;
  height: auto;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 4px solid #fff;
`;


const SidebarSection = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const SidebarTitle = styled.h2`
  font-size: 1.6em;
  margin-bottom: 10px;
  color: #fff;
  text-transform: uppercase;
  border-bottom: 2px solid #fff;
  padding-bottom: 5px;
`;

const SidebarItem = styled.p`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const Content = styled.div`
  padding: 20px;
`;

const Name = styled.h1`
  font-size: 3em;
  margin: 0;
  color: #007bff;
  font-weight: 800;
  text-transform: uppercase;
`;

const JobTitle = styled.h2`
  font-size: 1.5em;
  color: #555;
  margin-top: 10px;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 1.8em;
  color: #007bff;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    width: 40%;
    height: 2px;
    background-color: #007bff;
    bottom: -5px;
    left: 0;
  }
`;

const SectionItem = styled.div`
  margin-bottom: 25px;
`;

const InfoItem = styled.p`
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #333;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const SkillItem = styled.span`
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 1.2em;
  font-weight: 500;
`;

const SocialLink = styled.a`
  font-size: 1.2em;
  color: #007bff;
  text-decoration: none;
  margin-right: 15px;
  transition: color 0.3s;

  &:hover {
    color: #0056b3;
  }
`;

const DownloadButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
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

  const pdfStyles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: 'Helvetica',
      fontSize: 12,
    },
    header: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
    },
    section: {
      marginBottom: 20,
    },
    skillItem: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: 5,
      margin: 2,
      borderRadius: 15,
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
  

const PDFTemplate = ({ data }) => {
  const { profiles, Educationaldetails, Skills, MiniProject, SocialLinks } = data;

  return (
    <Document>
      <Page style={pdfStyles.page}>
        {/* Profile Section */}
        <Image source={img} />
        <View>
          {profiles.map((profile, index) => (
            <View key={index} style={pdfStyles.section}>
              <Text style={pdfStyles.header}>{profile.firstname} {profile.secondname}</Text>
              <Text>Front-end Developer</Text>
            </View>
          ))}
        </View>

        {/* Education Section */}
        <View>
          <Text style={pdfStyles.header}>Education</Text>
          {Educationaldetails.map((edu, index) => (
            <View key={index} style={pdfStyles.section}>
              <Text>{edu.coursename} - {edu.college} ({edu.completionyear})</Text>
              <Text>CGPA: {edu.percentage}</Text>
            </View>
          ))}
        </View>

        {/* Skills Section */}
        <View>
          <Text style={pdfStyles.header}>Skills</Text>
          <View>
            {Skills.map((skill, index) => (
              skill.input && skill.input.map((item, i) => (
                <Text key={i} style={pdfStyles.skillItem}>{item}</Text>
              ))
            ))}
          </View>
        </View>

        {/* Projects Section */}
        <View>
          <Text style={pdfStyles.header}>Mini Project</Text>
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

        {/* Social Links Section */}
        <View>
          <Text style={pdfStyles.header}>Social Links</Text>
          {SocialLinks.map((socialLink, index) => (
            Object.keys(socialLink).map((key) => (
              key !== 'id' && socialLink[key] && (
                <Text key={`${socialLink.id}-${key}`} style={pdfStyles.socialLink}>{socialLink[key]}</Text>
              )
            ))
          ))}
        </View>
      </Page>
    </Document>
  );
};
export default function UserTemplate2() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [profilesResponse, educationResponse, skillsResponse, MiniProjectResponse, socialLinksResponse] = await Promise.all([
          fetch('http://localhost:5000/profiles'),
          fetch('http://localhost:5000/Educationaldetails'),
          fetch('http://localhost:5000/Skills'),
          fetch('http://localhost:5000/MiniProject'),
          fetch('http://localhost:5000/SocialLinks')
        ]);

        const profiles = await profilesResponse.json();
        const Educationaldetails = await educationResponse.json();
        const Skills = await skillsResponse.json();
        const MiniProject = await MiniProjectResponse.json();
        const SocialLinks = await socialLinksResponse.json();

        setData({ profiles, Educationaldetails, Skills, MiniProject, SocialLinks });
      } catch (err) {
        console.error('Failed to fetch data', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();
  }, []);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load data: {error.message}</p>;
  }

  const { profiles, Educationaldetails, Skills, MiniProject, SocialLinks } = data;

  return (
    <TemplateContainer id="template-container">
      <Sidebar>
        <ProfileImage src={img} alt="Profile" />
        {profiles.map((profile) => (
          <SidebarSection key={profile.id}>
            <SidebarTitle>Contact Info</SidebarTitle>
            <SidebarItem>Email: {profile.email}</SidebarItem>
            <SidebarItem>Phone: {profile.number}</SidebarItem>
            <SidebarItem>Location: {profile.address}</SidebarItem>
          </SidebarSection>
        ))}
        
      </Sidebar>
      <Content>
        {profiles.map((profile) => (
          <div key={profile.id}>
            <Name>{profile.firstname} {profile.secondname}</Name>
            <JobTitle>Front-end Developer</JobTitle>
          </div>
        ))}

        <SectionTitle>Education</SectionTitle>
        {Educationaldetails.map((edu) => (
          <SectionItem key={edu.id}>
            <InfoItem>{edu.coursename} - {edu.college} ({edu.completionyear})</InfoItem>
            <InfoItem>CGPA: {edu.percentage}</InfoItem>
          </SectionItem>
        ))}

        <SectionTitle>Skills</SectionTitle>
        <SkillsList>
          {Skills.map((skill) => (
            skill.input && skill.input.map((item, index) => (
              <SkillItem key={index}>{item}</SkillItem>
            ))
          ))}
        </SkillsList>

        <SectionTitle>Mini Project</SectionTitle>
        <ProjectList>
  {MiniProject.map((project, index) => (
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


        <SectionTitle>Social Links</SectionTitle>
        <div>
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

        </div>
        <DownloadButton>
          <PDFDownloadLink
          style={{color:'white'}}
            document={<PDFTemplate data={data} />}
            fileName="profile.pdf"
          >
            {({ loading }) => (loading ? 'Preparing document...' : 'Download PDF')}
          </PDFDownloadLink>
        </DownloadButton>
      </Content>
    </TemplateContainer>
  );
}