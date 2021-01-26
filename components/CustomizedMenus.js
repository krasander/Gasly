import React, { useState } from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default function CustomizedMenus({
  activeClient,
  setActiveClient,
  clients,
}) {
  if (!clients) {
    return null;
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const classes = withStyles();
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (client) => {
    setActiveClient(client);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          onClick={handleClickListItem}
        >
          <ListItemText
            primary="Current client"
            secondary={activeClient.name}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {clients.map((client) => (
          <MenuItem
            key={client._id}
            onClick={(event) => handleMenuItemClick(client)}
          >
            {client.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
