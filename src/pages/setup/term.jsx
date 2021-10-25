import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  MenuItem,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import { getBusinessList } from "../../redux/action/businesses-actions";
import { getTermsOfBusiness } from "../../redux/action/terms-actions";
import { TextField, Accordion, Table, GradientButton } from "../../components";

const Term = () => {
  const dispatch = useDispatch();
  const businessList = useSelector((state) => state.businesses.businessList);
  const terms = useSelector((state) => state.terms.allTerms);
  const [selectedBusiness, setSelectedBusiness] = useState("");

  useEffect(() => {
    dispatch(getBusinessList());
  }, [dispatch]);

  useEffect(() => {
    setSelectedBusiness(businessList[0]?._id || "");
  }, [businessList]);

  useEffect(() => {
    selectedBusiness && dispatch(getTermsOfBusiness(selectedBusiness));
  }, [dispatch, selectedBusiness]);

  const businessChangeHandler = (e) => setSelectedBusiness(e.target.value);

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
        <Typography variant="h1" sx={{ fontSize: "28px", fontWeight: "bold" }}>
          Terms
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Manage all terms here
        </Typography>
      </Box>
      <TextField
        select
        variant="filled"
        sx={{ minWidth: "40%" }}
        label="Business Name*"
        value={selectedBusiness}
        onChange={businessChangeHandler}
      >
        {businessList.map(({ name, _id }) => {
          return (
            <MenuItem key={_id} value={_id}>
              {name}
            </MenuItem>
          );
        })}
      </TextField>
      <Accordion defaultExpanded={true} sx={{ mt: "20px !important" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
            <Typography variant="h2" sx={{ fontSize: "20px", flex: 1 }}>
              Billing
            </Typography>
            <GradientButton
              size="large"
              sx={{
                px: 0,
                minWidth: "52px",
                mr: "10px",
                borderRadius: (theme) => theme.shape.borderRadiuses.primary,
              }}
            >
              +
            </GradientButton>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          <Table
            headers={[1, 2, 3, 4]}
            rows={[{ id: 1, items: [1, 2, 3, 4] }]}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Term;
