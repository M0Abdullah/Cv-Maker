import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import img from '../../UseCases/Assets/car.jpg'; 
const Container = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1000px;
  margin: 0 auto;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top:20px;
`;

const LeftPanel = styled.div`
  background-color: #2b2b2b;
  color: white;
  padding: 20px;
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RightPanel = styled.div`
  padding: 20px;
  width: 65%;
  background-color: #fff;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  color: #ffbb33;
  border-bottom: 2px solid #ffbb33;
  padding-bottom: 5px;
  margin-bottom: 15px;
`;

const ListItem = styled.p`
  margin: 5px 0;
  font-size: 14px;
`;

const NameTitle = styled.div`
  margin-bottom: 20px;
`;

const Name = styled.h1`
  font-size: 32px;
  color: #333;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: normal;
  color: #ffbb33;
`;

const AboutMe = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const BulletPoint = styled.span`
  color: #ffbb33;
  font-size: 16px;
  margin-right: 10px;
`;

const JobTitle = styled.h4`
  color: #333;
  margin-bottom: 5px;
`;

const JobDetails = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
`;

const SkillsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const SkillItem = styled.div`
  width: 30%;
  text-align: center;
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f9f9f9;
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

const SocialLinksContainer = styled.div`
  margin-top: 20px;
`;
const DownloadButton = styled.button`
  background-color: #ffbb33;
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

  &:hover {
    background-color: #e0a00a;
  }

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


// Define PDF styles
const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  leftPanel: {
    width: '35%',
    backgroundColor: '#2b2b2b',
    color: 'white',
    padding: 20,
    textAlign: 'center',
  },
  rightPanel: {
    width: '65%',
    padding: 20,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: '50%',
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#ffbb33',
    borderBottom: '2px solid #ffbb33',
    paddingBottom: 5,
    marginBottom: 15,
    fontSize: 18,
  },
  listItem: {
    margin: '5px 0',
    fontSize: 12,
  },
  bulletPoint: {
    color: '#ffbb33',
    fontSize: 14,
    marginRight: 10,
  },
  name: {
    fontSize: 32,
    color: '#333',
  },
  title: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#ffbb33',
  },
  aboutMe: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
  },
  jobTitle: {
    color: '#333',
    marginBottom: 5,
  },
  jobDetails: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
  },
  skillsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  skillItem: {
    width: '30%',
    textAlign: 'center',
    border: '1px solid #ddd',
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  socialLink: {
    color: '#ffbb33',
    textDecoration: 'none',
    margin: '5px 0',
    fontSize: 12,
  },
  socialLinksContainer: {
    marginTop: 20,
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


// Create PDF document component
const PDFDocument = ({ profiles, Educationaldetails, Skills, MiniProject, SocialLinks }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.container}>
        <View style={pdfStyles.leftPanel}>
          <Image src={img} style={pdfStyles.profileImage} />
          <Text style={pdfStyles.sectionTitle}>CONTACT ME</Text>
          <Text style={pdfStyles.listItem}>
            <Text style={pdfStyles.bulletPoint}>•</Text> {profiles[0]?.address}
          </Text>
          <Text style={pdfStyles.listItem}>
            <Text style={pdfStyles.bulletPoint}>•</Text> {profiles[0]?.email}
          </Text>
          <Text style={pdfStyles.listItem}>
            <Text style={pdfStyles.bulletPoint}>•</Text> {profiles[0]?.number}
          </Text>

          <Text style={pdfStyles.sectionTitle}>REFERENCES</Text>
          <Text style={pdfStyles.listItem}>
            <Text style={pdfStyles.bulletPoint}>•</Text> Sir Fahad Joiya - Manager
          </Text>
          <Text style={pdfStyles.listItem}>
            <Text style={pdfStyles.bulletPoint}>•</Text> Sir Saad - Senior Developer
          </Text>

          <Text style={pdfStyles.sectionTitle}>EDUCATION</Text>
          {Educationaldetails.map((edu) => (
            <Text key={edu.id} style={pdfStyles.listItem}>
              <Text style={pdfStyles.bulletPoint}>•</Text> {edu.college}, {edu.coursename} ({edu.completionyear})
            </Text>
          ))}
        </View>

        <View style={pdfStyles.rightPanel}>
          <Text style={pdfStyles.name}>{profiles[0]?.firstname} {profiles[0]?.secondname}</Text>
          <Text style={pdfStyles.title}>Graphic & Web Designer</Text>

          <Text style={pdfStyles.sectionTitle}>ABOUT ME</Text>
          <Text style={pdfStyles.aboutMe}>A professional Graphic Designer... (about description goes here).</Text>

          <Text style={pdfStyles.sectionTitle}>JOB EXPERIENCE</Text>
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

          <Text style={pdfStyles.sectionTitle}>SKILLS</Text>
          <View style={pdfStyles.skillsContainer}>
            {Skills.map((skill) => (
              <View key={skill.id} style={pdfStyles.skillItem}>
                <Text>{skill.input[0]}</Text>
              </View>
            ))}
          </View>

          <Text style={pdfStyles.sectionTitle}>SOCIAL LINKS</Text>
          <View style={pdfStyles.socialLinksContainer}>
            {SocialLinks.map((link) => (
              <Text key={link.id} style={pdfStyles.socialLink}>
                {link[0]}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

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
    <Container>
      <LeftPanel>
        <ProfileImage src={img} alt="Profile" />
        <SectionTitle>CONTACT ME</SectionTitle>
        <ListItem style={{fontWeight:'600'}}  ><BulletPoint>•</BulletPoint>{profiles[0]?.address}</ListItem>
        <ListItem style={{fontWeight:'600'}}  ><BulletPoint>•</BulletPoint>{profiles[0]?.email}</ListItem>
        <ListItem style={{fontWeight:'600'}}  ><BulletPoint>•</BulletPoint>{profiles[0]?.number}</ListItem>

        <SectionTitle>REFERENCES</SectionTitle>
        <ListItem style={{fontWeight:'600'}} ><BulletPoint>•</BulletPoint  >Sir Fahad Joiya - Manager</ListItem>
        <ListItem style={{fontWeight:'600'}}  ><BulletPoint>•</BulletPoint>Sir Saad - Senior Developer</ListItem>

        <SectionTitle>EDUCATION</SectionTitle>
        {Educationaldetails.map((edu) => (
            <div key={edu.id}>
              <h4 style={{ marginLeft: '12px', padding: '5px' }}>{edu.college}</h4>
              <p style={{ marginLeft: '12px', padding: '5px' }}>Course: {edu.coursename} ({edu.completionyear})</p>
              <p style={{ marginLeft: '12px', padding: '5px' }}>Percentage: {edu.percentage}</p>
            </div>
          ))}
      </LeftPanel>

      <RightPanel>
        <NameTitle>
          <Name>{profiles[0]?.firstname} {profiles[0]?.secondname}</Name>
          <Title>Graphic & Web Designer</Title>
        </NameTitle>

        <SectionTitle>ABOUT ME</SectionTitle>
        <AboutMe>A professional Graphic Designer... (about description goes here).</AboutMe>

        <SectionTitle>JOB EXPERIENCE</SectionTitle>
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


        <SectionTitle>SKILLS</SectionTitle>
        <SkillsContainer>
          {Skills.map((skill) => (
            skill.input && skill.input.map((item, index) => (
              <SkillItem key={index}>{item}</SkillItem>
            ))
          ))}
        </SkillsContainer>

        <SocialLinksContainer>
          <SectionTitle>SOCIAL LINKS</SectionTitle>
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
        </SocialLinksContainer>
      </RightPanel>
      <DownloadButton>

      <PDFDownloadLink
      style={{color:'white'}}
        document={
          <PDFDocument
          profiles={profiles}
            Educationaldetails={Educationaldetails}
            Skills={Skills}
            MiniProject={MiniProject}
            SocialLinks={SocialLinks}
            />
          }
        fileName="user_resume.pdf"
        >
        {({ loading }) => (loading ? 'Loading PDF...' : 'Download PDF')}
      </PDFDownloadLink>
        </DownloadButton>
    </Container>
  );
}
