import Card from "./Card";
import { makeStyles } from "@mui/styles";
import Output from "../../components/output";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container: {
    width: "880px",
    padding: "10px 0px",
    margin: "0px 0px 0px 58px",
  },
  items: {
    width: "25%",
  },
});

const PersonalInfo = () => {
  const styles = useStyles();
  return (
    <div>
      <Card />
      <div className={styles.container}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Parent / Carer Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.itemContainer}>
              <div className={styles.items}>
                <Output
                  title="Parent User ID*"
                  description="Driving Licence"
                  variant="title"
                />
              </div>
              <div className={styles.items}>
                <Output
                  title="Full Name*"
                  description="Nizam Mogal"
                  variant="title"
                />
              </div>
              <div className={styles.items}>
                <Output
                  title="Email"
                  description="ni@gmail.com"
                  variant="title"
                />
              </div>
              <div className={styles.items}>
                <Output
                  title="Contact Number"
                  description="0757576757"
                  variant="title"
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className={styles.container}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography> Emergency Contact (Primary)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.itemContainer}>
              <div className={styles.items}>
                <Output
                  title="Name"
                  description="Marama Petera"
                  variant="title"
                />
              </div>
              <div className={styles.items}>
                <Output
                  title="Relationship"
                  description="Uncle"
                  variant="title"
                />
              </div>
              <div className={styles.items}>
                <Output
                  title="Contact Number*"
                  description="0757576757"
                  variant="title"
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className={styles.container}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography> Emergency Contact (Secondary)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.itemContainer}>
              <div className={styles.items}>
                <Output
                  title="Name"
                  description="Marama Petera"
                  variant="title"
                />
              </div>
              <div className={styles.items}>
                <Output
                  title="Relationship"
                  description="Friend"
                  variant="title"
                />
              </div>
              <div className={styles.items}>
                <Output
                  title="Contact Number*"
                  description="0757576757"
                  variant="title"
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default PersonalInfo;
