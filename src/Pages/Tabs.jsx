import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../Components/Card";
import Certificate from "../Components/Certificate";
import PIcon from "../Components/CardIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import { styled } from "@mui/system";

const normalizeProject = (project, fallbackIndex = 0) => {
  const title = project?.Title || project?.title || `Project ${fallbackIndex + 1}`;
  const description = project?.Description || project?.description || "Deskripsi project belum tersedia.";
  const img = project?.Img || project?.img || "/ImgWeb.png";
  let link = project?.Link || project?.link || "#";

  if (typeof link === "string" && link && !/^https?:\/\//i.test(link) && !/^mailto:/i.test(link) && !link.startsWith("#")) {
    link = `https://${link}`;
  }

  return {
    Title: title,
    Description: description,
    Img: img,
    Link: link,
  };
};

const defaultProjects = [
  {
    Img: "/Project/BlushPink.png",
    Title: "E-Invite - Blush Pink",
    Description: "Website Undangan Digital dengan Tema Blush & Pink serta Beberapa Elemen seperti: Hero Image Couple, Contdown Timer, Galerry Photo, Maps Location, Background Music dan Guest Comments.",
    Link: "https://blush-pink.vercel.app",
  },
  {
    Img: "/Project/RomanticGarden.png",
    Title: "E-Invite - Romantic Garden",
    Description: "Website Undangan Digital dengan Tema Romantic Garden serta Elemen Seperti Hero Image Couple, Countdown Timer, Galerry Photo, Maps Location, Background Music dan Guest Comments.",
    Link: "romantic-garden-wedding.vercel.app",
  },
  {
    Img: "Project/GoldModernGlass.png",
    Title: "Gold & Modern Glass",
    Description: "Website Undangan Digital dengan Tema Romantic Garden serta Elemen Seperti Hero Image Couple, Countdown Timer, Galerry Photo, Maps Location, Background Music dan Guest Comments.",
    Link: "https://gold-modern-glass.vercel.app/",
  },
  {
    Img: "/Project/Komputama.png",
    Title: "Website Kelas - XII TJKT.2",
    Description: "Website Kelas Tema simple dengan menampilkan dokumentasi personil kelas dan beberapa dokumentasi momen semasa di bangku sekolah.",
    Link: "https://komputama-26.edgeone.dev/",
  },
];

function TabPanel(props) {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [projects] = useState(defaultProjects.map((project, index) => normalizeProject(project, index)));
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleShowMoreProjects = () => {
    setShowAllProjects(true);
  };

  const handleShowMoreCertificates = () => {
    setShowAllCertificates(true);
  };

  const handleShowLessProjects = () => {
    setShowAllProjects(false);
  };

  const handleShowLessCertificates = () => {
    setShowAllCertificates(false);
  };

  return (
    <div className="md:px-[10%]  md:mt-20 mt-10" id="Tabs" data-aos="fade-up" data-aos-duration="800">
      <Box sx={{ width: "100%" }}>
        <AppBar position="static" sx={{ bgcolor: "transparent" }} className="px-[6%]">
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "auto",
              margin: "0 auto",
            }}
          >
            <Tab label="Project" {...a11yProps(0)} sx={{ fontWeight: "Bold", color: "#ced4d7", fontSize: ["1rem", "2rem"] }} />
            <Tab label="Certificate" {...a11yProps(1)} sx={{ fontWeight: "Bold", color: "#ced4d7", fontSize: ["1rem", "2rem"] }} />
            <Tab label="Tech Stack" {...a11yProps(2)} sx={{ fontWeight: "Bold", color: "#ced4d7", fontSize: ["1rem", "2rem"] }} />
          </Tabs>
        </AppBar>

        <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={setValue}>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto overflow-hidden">
              <h2 className="text-center text-3xl font-semibold text-[#ced4d7] mb-6">My Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map((project, index) => (
                  <CardProject
                    key={index}
                    Img={project.Img || project.img || "/ImgWeb.png"}
                    Title={project.Title || project.title || `Project ${index + 1}`}
                    Description={project.Description || project.description || "Deskripsi project belum tersedia."}
                    Link={project.Link || project.link || "#"}
                  />
                ))}
              </div>
            </div>
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">{/* Certificates temporarily hidden */}</div>
            </div>
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                <PIcon PIcon="html.svg" Language="HTML" />
                <PIcon PIcon="css.svg" Language="CSS" />
                <PIcon PIcon="javascript.svg" Language="JavaScript" />
                <PIcon PIcon="tailwind.svg" Language="Tailwind CSS" />
                <PIcon PIcon="reactjs.svg" Language="ReactJS" />
                <PIcon PIcon="vite.svg" Language="Vite" />
                <PIcon PIcon="nodejs.svg" Language="Node JS" />
                <PIcon PIcon="bootstrap.svg" Language="Bootstrap" />
                <PIcon PIcon="firebase.svg" Language="Firebase" />
                <PIcon PIcon="MUI.svg" Language="Material UI" />
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}
