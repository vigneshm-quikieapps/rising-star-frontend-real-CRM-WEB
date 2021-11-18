import { Modal, Box } from "@mui/material";

import { Table } from "../../../components";

const ClassList = ({ open, list, onSelect }) => {
  return (
    <Modal open={open}>
      <Box sx={{ bgcolor: (theme) => theme.palette.background.main }}>
        <Table
          heading="Select a Class"
          headers={["Class Name"]}
          rows={list.map(({ _id, name }) => ({
            items: [name],
            onClick: () => onSelect(_id),
          }))}
        />
      </Box>
    </Modal>
  );
};

export default ClassList;
