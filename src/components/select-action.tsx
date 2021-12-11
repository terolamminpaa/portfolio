import { useRef, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

interface ActionItem {
  text: string;
  icon?: JSX.Element;
  action: () => void;
}

interface Props {
  actionItems: ActionItem[];
}

/**
 * Footer component
 */
export default function SelectAction(props: Props) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(true);
  }

  const toggleClosed = () => {
    setOpen(false);
  }

  const itemClick = (action: () => void) => () => {
    action();
    toggleClosed();
  }

  const renderActions = () => {
    const { actionItems } = props;
    return actionItems.map((item, index) => (
      <MenuItem key={index} onClick={itemClick(item.action)}>
        { !!item.icon &&
          <ListItemIcon>
            { item.icon }
          </ListItemIcon>
        }
        <ListItemText>{item.text}</ListItemText>
      </MenuItem>
    ));
  }
  
  return (
    <>
      <IconButton onClick={toggleOpen}>
        <MoreVertIcon ref={anchorRef} />
      </IconButton>
      <Menu
        open={open}
        onClose={toggleClosed}
        anchorEl={anchorRef.current}
      >
        { renderActions() }
      </Menu>
    </>
  );

}