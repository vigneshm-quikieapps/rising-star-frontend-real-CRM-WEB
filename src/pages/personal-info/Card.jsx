import "./styles.css";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const useStyles = makeStyles({
  cardContainer: {
    width: "880px",
    height: "148px",
    margin: "25px 150px 10px 58px",
    padding: "10px 10px 20px 20px",
    borderRadius: "20px",
    border: "solid 2px #f2f1f6",
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    width: "605px",
    height: "38px",
    margin: "10px 193px 6px 0",
    fontFamily: "Manrope",
    fontSize: "28px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.2px",
    color: "#000",
  },

  iconContainer: {
    width: "52px",
    height: "48px",
    borderRadius: "12px",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0)",
    border: "solid 1px #e9e7f1",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  subHeading: {
    width: "118px",
    height: "19px",
    margin: "6px 97px 10px 0",
    opacity: "0.5",
    fontFamily: "Manrope",
    fontSize: "14px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#000",
  },
});

const Card = () => {
  const styles = useStyles();
  return (
    <div className={styles.cardContainer}>
      <div className={styles.header}>
        <div className={styles.headingContainer}>
          <p className={styles.heading}>Ayman Mogal </p>
        </div>
        <div className={styles.iconContainer}>
          <MoreHorizIcon />
        </div>
      </div>

      <div className={styles.subHeader}>
        <p className={styles.subHeading}>Student/Member</p>
      </div>
    </div>
  );
};

export default Card;
