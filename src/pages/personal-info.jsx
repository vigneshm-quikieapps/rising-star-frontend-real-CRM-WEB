import Output from "../components/output";
import Accordion from "./../components/accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "./../containers/card";
import { Typography, Box } from "@mui/material";

const PersonalInfo = () => {
  return (
    <Box>
      <Card heading={"Ayman Mogal"} subHeading={"Student/Member"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Box
            sx={{
              width: "25%",
            }}
          >
            <Output
              title="Full Name"
              description="Ayman Mogal"
              variant="title"
            />
          </Box>
          <Box
            sx={{
              width: "25%",
            }}
          >
            <Output title="Gender*" description="Boy" variant="title" />
          </Box>
          <Box
            sx={{
              width: "25%",
            }}
          >
            <Output
              title="Date of Birth*"
              description="5th January, 1992"
              variant="title"
            />
          </Box>
        </Box>
      </Card>
      <Box
        sx={{
          width: "880px",
          padding: "10px 0px",
          margin: "0",
        }}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Parent / Carer Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  width: "25%",
                }}
              >
                <Output
                  title="Parent User ID*"
                  description="Driving Licence"
                  variant="title"
                />
              </Box>
              <Box
                sx={{
                  width: "25%",
                }}
              >
                <Output
                  title="Full Name*"
                  description="Nizam Mogal"
                  variant="title"
                />
              </Box>
              <Box
                sx={{
                  width: "25%",
                }}
              >
                <Output
                  title="Email"
                  description="ni@gmail.com"
                  variant="title"
                />
              </Box>
              <Box
                sx={{
                  width: "25%",
                }}
              >
                <Output
                  title="Contact Number"
                  description="0757576757"
                  variant="title"
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box
        sx={{
          width: "880px",
          padding: "10px 0px",
          margin: "0",
        }}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography> Emergency Contact (Primary)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  width: "25%",
                }}
              >
                <Output
                  title="Name"
                  description="Marama Petera"
                  variant="title"
                />
              </Box>
              <Box
                sx={{
                  width: "25%",
                }}
              >
                <Output
                  title="Relationship"
                  description="Uncle"
                  variant="title"
                />
              </Box>
              <Box
                sx={{
                  width: "25%",
                }}
              >
                <Output
                  title="Contact Number*"
                  description="0757576757"
                  variant="title"
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box
        sx={{
          width: "880px",
          padding: "10px 0px",
          margin: "0",
        }}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography> Emergency Contact (Secondary)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  width: "25%",
                }}
              >
                <Output
                  title="Name"
                  description="Marama Petera"
                  variant="title"
                />
              </Box>
              <Box
                sx={{
                  width: "25%",
                }}
              >
                <Output
                  title="Relationship"
                  description="Friend"
                  variant="title"
                />
              </Box>
              <Box
                sx={{
                  width: "25%",
                }}
              >
                <Output
                  title="Contact Number*"
                  description="0757576757"
                  variant="title"
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default PersonalInfo;
