import { Box } from "@mui/system";

import { Output, Status } from ".";

const statusMap = { ACTIVE: "green", INACTIVE: "red" };

const Outputs = ({
  items,
  itemWidth = "25%",
  columnGap = "0",
  rowGap = "10px",
}) => {
  const arrayItems = Object.entries(items);
  return (
    <Box
      sx={{ display: "grid", rowGap, columnGap, "&>*": { width: itemWidth } }}
    >
      {arrayItems.map((item, index) => {
        let [title, description] = item;
        if (title.toLowerCase() === "status") {
          const status = statusMap[description.toUpperCase()];
          description = <Status status={status} title={title} />;
        }
        return <Output key={index} title={title} description={description} />;
      })}
    </Box>
  );
};

export default Outputs;
