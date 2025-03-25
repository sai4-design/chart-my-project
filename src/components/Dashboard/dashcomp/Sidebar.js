import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link} from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <Drawer
        sx={{
          width: '100px'
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem component={Link} to="/home">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} to="/aboutus">
            <ListItemText primary="About Us" />
          </ListItem>
          <ListItem component={Link} to="/blogus">
            <ListItemText primary="Blog Us" />
          </ListItem>
        </List>
      </Drawer>

    </>
  );
}

export default SideBar;
