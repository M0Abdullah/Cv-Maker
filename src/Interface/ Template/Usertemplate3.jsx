import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import img from '../../UseCases/Assets/download.jpeg'; // Ensure this path is correct
import { Button } from 'antd';
import { Page, Text, View, Document, PDFDownloadLink, Image, StyleSheet } from '@react-pdf/renderer';

// Styled components
const ResumeContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  font-family: 'Arial', sans-serif;

  @media (max-width: 1078px) {
    width: 90%;
  }

  @media (max-width: 786px) {
    width: 95%;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 10px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #004c97;
  color: white;
  padding: 20px;
  border-radius: 8px;

  @media (max-width: 1078px) {
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 786px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    border-radius: 5px;
  }
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

const HeaderInfo = styled.div`
  flex-grow: 1;
  margin-left: 20px;
`;

const Name = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;

const JobTitle = styled.h2`
  font-size: 1.5rem;
  margin: 5px 0;
`;

const ContactInfo = styled.div`
  margin-top: 10px;
  p {
    margin: 0;
    font-size: 1rem;
  }
`;

const Section = styled.div`
  margin: 40px 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #004c97;
  border-bottom: 2px solid #f0b90b;
  display: inline-block;
  margin-bottom: 10px;
`;

const ExperienceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ExperienceItem = styled.div`
  width: 45%;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const TimePeriod = styled.p`
  font-weight: bold;
  color: #333;
`;

const Company = styled.p`
  color: #004c97;
  font-weight: bold;
`;

const Description = styled.p`
  color: #555;
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
const SkillItem = styled.div`
  width: 25%;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const SectionItem = styled.div`
    width: 45%;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;
const InfoItem = styled.p`
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #333;
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
    background-color: #fff;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

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

const DownloadButton = styled.button`
  background-color: #004c97;
  color: #004c97;
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
const pdfStyles = StyleSheet.create({
  page: {
    backgroundColor: '#f4f4f4',
    padding: 20,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: '2px solid #004c97',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#004c97',
    color: 'white',
    padding: 20,
    borderRadius: 8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: '50%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  jobTitle: {
    fontSize: 18,
    marginTop: 10,
  },
  contactInfo: {
    marginTop: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  project: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  projectDescription: {
    fontSize: 12,
  },
  skillItem: {
    padding: 5,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 4,
    fontSize: 12,
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



const MyDocument = ({ profiles, Educationaldetails, Skills, MiniProject, SocialLinks }) => (
  <Document>
    <Page style={pdfStyles.page}>
      {/* Header Section */}
      <View style={pdfStyles.header}>
        <Image src={img} style={pdfStyles.profileImage} />
        <View>
          <Text style={pdfStyles.name}>{profiles[0]?.firstname} {profiles[0]?.secondname}</Text>
          <Text style={pdfStyles.jobTitle}>{Skills[0]?.input[0]}</Text>
          <Text style={pdfStyles.contactInfo}>Phone: {profiles[0]?.number}</Text>
          <Text style={pdfStyles.contactInfo}>Email: {profiles[0]?.email}</Text>
          <Text style={pdfStyles.contactInfo}>Address: {profiles[0]?.address}</Text>
        </View>
      </View>

      {/* Education Section */}
      <View style={pdfStyles.section}>
        <Text>Education</Text>
        {Educationaldetails.map((education) => (
          <View key={education.id}>
            <Text style={pdfStyles.text}>{education.completionyear} - {education.coursename} ({education.college})</Text>
          </View>
        ))}
      </View>

      {/* Skills Section */}
      <View style={pdfStyles.section}>
        <Text>Skills</Text>
        {Skills.map((skill) => (
          skill.input.map((item, index) => (
            <Text key={index} style={pdfStyles.skillItem}>{item}</Text>
          ))
        ))}
      </View>

      {/* Projects Section */}
      <View style={pdfStyles.section}>
        <Text>Projects</Text>
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
      <View style={pdfStyles.section}>
        <Text>Social Links</Text>
        {SocialLinks.map((socialLink, index) => (
          Object.keys(socialLink).map((key) => (
            key !== 'id' && socialLink[key] && (
              <Text key={`${socialLink.id}-${key}`} style={pdfStyles.text}>{socialLink[key]}</Text>
            )
          ))
        ))}
      </View>
    </Page>
  </Document>
);

// Main component function
export default function UserTemplate() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const responses = await Promise.all([
          fetch('http://localhost:5000/profiles'),
          fetch('http://localhost:5000/Educationaldetails'),
          fetch('http://localhost:5000/Skills'),
          fetch('http://localhost:5000/MiniProject'),
          fetch('http://localhost:5000/SocialLinks'),
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load data: {error.message}</p>;
  }

  const { profiles, Educationaldetails, Skills, MiniProject, SocialLinks } = data;



  return (
    <ResumeContainer>
      {/* Header Section */}
      <Header>
        <ProfilePicture src={img} alt="Profile Picture" />
        <HeaderInfo>
          <Name>{profiles[0]?.firstname} {profiles[0]?.secondname}</Name>
          <JobTitle>{Skills[0]?.input[0]}</JobTitle>
          <ContactInfo>
            <p>Phone: {profiles[0]?.number}</p>
            <p>Email: {profiles[0]?.email}</p>
            <p>Address: {profiles[0]?.address}</p>
          </ContactInfo>
        </HeaderInfo>
      </Header>

      {/* Experience Section */}
      <Section>
        <SectionTitle>Projects</SectionTitle>
        <ExperienceContainer>
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


        </ExperienceContainer>
      </Section>

      {/* Education Section */}
      <Section>
        <SectionTitle>Education</SectionTitle>
        <ExperienceContainer>
          {Educationaldetails.map((education) => (
            <ExperienceItem key={education.id}>
              <TimePeriod>Year: {education.completionyear}</TimePeriod>
              <Company>Degree: {education.coursename}</Company>
              <Description>University: {education.college}</Description>
              <Description>C-GPA: {education.percentage}</Description>
            </ExperienceItem>
          ))}
        </ExperienceContainer>
      </Section>

      {/* Skills Section */}
      <Section>
        <SectionTitle>Skills</SectionTitle>
        {Skills.map((skill) => (
          skill.input && skill.input.map((item, index) => (
            <SkillItem key={index}>{item}</SkillItem>
          ))
        ))}
      </Section>

      {/* Social Links Section */}
      <Section>
        <SectionTitle>Social Links</SectionTitle>
        <br />
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

      </Section>
      <DownloadButton>

      <PDFDownloadLink
      style={{color:'white'}}
        document={<MyDocument profiles={profiles} Educationaldetails={Educationaldetails} Skills={Skills} MiniProject={MiniProject} SocialLinks={SocialLinks} />}
        fileName="resume.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Preparing document...' : 'Download PDF'
      }
      </PDFDownloadLink>
      </DownloadButton>

    </ResumeContainer>
  );
}
