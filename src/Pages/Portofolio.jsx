import React, { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes, GraduationCap } from "lucide-react";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = 4;

  // Add education data
  const educationData = [
    {
      id: "mca",
      institution: "Mangalam College of Engineering",
      degree: "Master of Computer Applications",
      field: "Computer Applications",
      year: "2024 - Present",
      location: "Ettumanoor",
      achievements: [
        "CGPA: 7.85/10"
      ]
    },
    {
      id: "bca",
      institution: "Mar Gregorios College",
      degree: "Bachelor of Computer Applications",
      field: "Computer Applications",
      year: "2020 - 2023",
      location: "Alappuzha",
      achievements: [
        "CGPA: 7.15/10"
      ]
    },
    {
      id: "highschool",
      institution: "ST. Mary's H.S.S Champakulam",
      degree: "Higher Secondary Education (HSC)",
      field: "Science",
      year: "2018 - 2020",
      location: "Champakulam",
      achievements: [
        "Percentage: 69%"
      ]
    }
  ];

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const projectCollection = collection(db, "projects");
      const certificateCollection = collection(db, "certificates");

      const [projectSnapshot, certificateSnapshot] = await Promise.all([
        getDocs(projectCollection),
        getDocs(certificateCollection),
      ]);

      const projectData = [
        {
          id: "weather-monitoring",
          Title: "Weather Monitoring App",
          Description: "This weather application is designed to provide users with real-time weather information for specific locations. It retrieves weather data from online APIs, processes it, and displays it in a user-friendly format using a web interface. The app is structured with a backend powered by Python and Flask and a frontend that uses HTML templates for presentation.",
          Img: "/projects/weather.jpg",
          TechStack: ["Python", "Flask", "HTML", "OpenWeatherMap API"],
          Features: [
            "Real-time Weather Information",
            "Temperature & Humidity Display",
            "Wind Speed Monitoring",
            "Weather Conditions Updates"
          ]
        },
        {
          id: "plant-disease-detection",
          Title: "Plant Disease Detection",
          Description: "Plant Disease Detection aims to leverage technology to accurately identify and diagnose diseases in plants using advanced image processing techniques. The system analyzes images of plant leaves, stems, or fruits to detect visible symptoms like spots, discoloration, or wilting, helping to pinpoint specific diseases affecting the plant.",
          Img: "/projects/plant-disease.jpg",
          TechStack: ["Python", "OpenCV", "TensorFlow", "PyTorch", "React Native", "AWS"],
          Features: [
            "Image Acquisition & Processing",
            "Disease Classification using CNNs",
            "Pest Identification",
            "Feature Extraction",
            "Result Interpretation",
            "IoT Integration"
          ]
        },
        {
          id: "farmers-assistant",
          Title: "Farmers Assistant",
          Description: "The main objective is to identify plant diseases using image processing. The system also identifies insects and pests responsible for epidemic plant diseases.",
          Img: "/projects/farmers-assistant.jpg",
          TechStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Python", "Machine Learning"],
          Features: ["Plant Disease Detection", "Pest Identification", "Image Processing"]
        },
        {
          id: "clinic-management",
          Title: "Clinic Management System",
          Description: "A comprehensive software solution designed to streamline the administration, operation, and record-keeping processes of a medical clinic. It encompasses tasks such as patient registration, appointment scheduling, medical record management, billing, inventory tracking, and report generation.",
          Img: "/projects/cms.jpg",
          TechStack: ["HTML", "CSS", "JavaScript", "PHP", "Python", "MongoDB"],
          Features: ["Patient Registration", "Appointment Scheduling", "Medical Record Management", "Billing System", "Inventory Tracking", "Report Generation"]
        },
        ...projectSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
            TechStack: doc.data().TechStack || [],
          }))
          .filter(project => project.Title !== "Aritmatika Solver")
      ];

      const certificateData = [
        {
          id: "nptel",
          Title: "NPTEL Certification",
          Description: "NPTEL Online Certification",
          Img: "/certificates/nptel.png"
        },
        {
          id: "internship",
          Title: "Internship Certificate",
          Description: "Internship Completion Certificate",
          Img: "/certificates/internship.jpg"
        },
        {
          id: "cricket",
          Title: "Cricket Achievement",
          Description: "Cricket Achievement Certificate",
          Img: "/certificates/criket.jpg"
        },
        {
          id: "gregoria",
          Title: "Gregoria Certificate",
          Description: "Gregoria Achievement Certificate",
          Img: "/certificates/gregoria.jpg"
        }
      ];

      setProjects(projectData);
      setCertificates(certificateData);

      // Store in localStorage
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'certificates') {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              // Existing styles remain unchanged
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
            <Tab
              icon={<GraduationCap className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Education"
              {...a11yProps(3)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={index % 2 === 0 ? "fade-up-right" : "fade-up-left"}
                    data-aos-duration={1000}
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificate.Img} />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>

          <TabPanel value={value} index={3} dir={theme.direction}>
            <div className="container mx-auto flex flex-col gap-8 overflow-hidden pb-[5%]">
              {educationData.map((edu, index) => (
                <div
                  key={edu.id}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all"
                  data-aos={index === 0 ? "fade-right" : "fade-left"}
                  data-aos-duration="1000"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{edu.institution}</h3>
                        <p className="text-indigo-400 font-medium">{edu.degree}</p>
                        <p className="text-gray-400">{edu.field}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400">{edu.year}</p>
                        <p className="text-gray-500">{edu.location}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Achievements & Activities</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="text-gray-400">{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}