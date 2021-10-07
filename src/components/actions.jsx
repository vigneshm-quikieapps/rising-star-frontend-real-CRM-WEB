import { IconButton } from "@mui/material";
import {
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";

const Actions = ({ onEdit, onDelete }) => (
  <div>
    <IconButton onClick={onEdit}>
      <EditIcon />
    </IconButton>
    <IconButton onClick={onDelete} color="secondary">
      <DeleteIcon />
    </IconButton>
  </div>
);

export default Actions;
