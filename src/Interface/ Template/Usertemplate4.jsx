import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import img from '../../UseCases/Assets/car.jpg'; // Placeholder image
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer'; 


const Container = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1000px;
  margin: 0 auto;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
`;

const LeftPanel = styled.div`
  background-color: #2b2b2b;
  color: white;
  padding: 20px;
  width: 35%;
`;

const RightPanel = styled.div`
  padding: 20px;
  width: 65%;
`;

const SectionTitle = styled.h3`
  color: white;
  border-bottom: 1px solid #777;
  padding-bottom: 5px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const ListItem = styled.p`
  margin: 5px 0;
`;

const SectionTitle1 = styled.div`
  border-bottom: 1px solid #777;
  padding-bottom: 5px;
  padding: 10px;
  font-size: 1.5em;
  font-weight: 600;
`;
const SocialLink = styled.a`
  color: #ffbb33;
  text-decoration: none;
  margin: 5px 0;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SkillItem = styled.div`
  text-align: center;
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f9f9f9;
  color:black;
      display: flex;
    justify-content: space-between;
    width: 100%;
  background-color: #d1d5db;

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

const DownloadButton = styled.button`
  background-color: #2b2b2b;
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
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    padding: 30,
  },
  leftPanel: {
    width: '35%',
    backgroundColor: '#2b2b2b',
    color: 'white',
    padding: 20,
  },
  rightPanel: {
    width: '65%',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 5,
    color: 'white',
    borderBottom: '1px solid #777',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: '50%',
    marginBottom: 20,
  },
  listItem: {
    marginBottom: 5,
    color: 'white',
  },
  sectionTitle1: {
    borderBottom: '1px solid #777',
    fontSize: 18,
    marginBottom: 5,
    paddingBottom: 5,
  },
  projectContainer: {
    marginBottom: 20,
    padding: 15,
    borderBottom: '2px solid #F7965F',
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  projectTech: {
    fontSize: 12,
    marginBottom: 5,
    color: '#555',
  },
  projectDescription: {
    fontSize: 10,
    marginBottom: 10,
    color: '#666',
  },
  skillItem: {
    width: '30%',
    textAlign: 'center',
    border: '1px solid #ddd',
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
});

// Create the PDF Document
const UserPDF = ({ profiles, Educationaldetails, Skills, MiniProject, SocialLinks }) => (
  <Document>
    <Page style={styles.page}>
      {/* Left Panel */}
      <View style={styles.leftPanel}>
        <Image style={styles.profileImage} src={img} />
        <Text style={styles.sectionTitle}>Contact</Text>
        {profiles.map((profile, index) => (
          <View key={index}>
            <Text style={styles.listItem}>Address: {profile.address}</Text>
            <Text style={styles.listItem}>Phone: {profile.number}</Text>
            <Text style={styles.listItem}>Email: {profile.email}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Skills</Text>
        {Skills.map((skill) => (
              <View key={skill.id} style={styles.skillItem}>
                <Text>{skill.input[0]}</Text>
              </View>
            ))}
      </View>

      {/* Right Panel */}
      <View style={styles.rightPanel}>
        <Text style={styles.sectionTitle1}>Projects</Text>
        {MiniProject.map((project, index) => (
          <View key={index} style={styles.projectContainer}>
            {Object.keys(project)
              .filter((key) => key !== 'id')
              .map((key, idx) => {
                const item = project[key];
                return (
                  <View key={idx}>
                    <Text style={styles.projectTitle}>{item?.name || 'No name provided'}</Text>
                    <Text style={styles.projectTech}>
                      <strong>Technology:</strong> {item?.tech || 'No technology provided'}
                    </Text>
                    <Text style={styles.projectDescription}>
                      <strong>Description:</strong> {item?.description || 'No description provided'}
                    </Text>
                  </View>
                );
              })}
          </View>
        ))}

        <Text style={styles.sectionTitle1}>Education</Text>
        {Educationaldetails.map((edu, index) => (
          <View key={index}>
            <Text>{edu.college}</Text>
            <Text>Course: {edu.coursename} ({edu.completionyear})</Text>
            <Text>Percentage: {edu.percentage}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);


export default function UserTemplate() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    <Container id="template-main">
      {/* Left Panel */}
      <LeftPanel>
        <ProfileImage src={img} alt="Profile" />
        <SectionTitle>Contact</SectionTitle>
        <div>
          {profiles.map((profile) => (
            <div key={profile.id}>
              <ListItem>Address: {profile.address}</ListItem>
              <ListItem>Phone: {profile.number}</ListItem>
              <ListItem>Email: {profile.email}</ListItem>
            </div>
          ))}
        </div>

        <SectionTitle>Skills</SectionTitle>
        <div>
        {Skills.map((skill) => (
            skill.input && skill.input.map((item, index) => (
              <SkillItem key={index}>{item}</SkillItem>
            ))
          ))}
        </div>

        <SectionTitle>References</SectionTitle>
        <ListItem>Sir Fahad Joiya - Manager</ListItem>
        <DownloadButton>

        <PDFDownloadLink
        style={{color:'white'}}
        document={<UserPDF profiles={profiles} Educationaldetails={Educationaldetails} Skills={Skills} MiniProject={MiniProject} SocialLinks={SocialLinks} />}
        fileName="profile.pdf"
        >
        {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
        </DownloadButton>
      </LeftPanel>

      {/* Right Panel */}
      <RightPanel>
        <h1>{profiles[0]?.firstname} {profiles[0]?.secondname}</h1>
        <SectionTitle1>Projects</SectionTitle1>
        <div>
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

        </div>

        <SectionTitle1>Education</SectionTitle1>
        <div>
          {Educationaldetails.map((edu) => (
            <div key={edu.id}>
              <h4 style={{ marginLeft: '12px', padding: '5px' }}>{edu.college}</h4>
              <p style={{ marginLeft: '12px', padding: '5px' }}>Course: {edu.coursename} ({edu.completionyear})</p>
              <p style={{ marginLeft: '12px', padding: '5px' }}>Percentage: {edu.percentage}</p>
            </div>
          ))}
        </div>

        <SectionTitle1>Social Links</SectionTitle1>
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
     
      </RightPanel>
    </Container>
  );
}
