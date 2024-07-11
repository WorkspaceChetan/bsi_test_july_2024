"use client";

import { Menu } from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}
        data-e2e="sidebar"
      >
        <IconButton onClick={toggleDrawer(true)}>
          <Menu />
        </IconButton>
        <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
          <Box sx={{ width: 250 }}>
            <List>
              <ListItem onClick={toggleDrawer(false)}>
                <Box
                  component={Link}
                  href="/"
                  sx={{ textDecoration: "none", color: "black", width: "100%" }}
                >
                  <ListItemButton>Users</ListItemButton>
                </Box>
              </ListItem>
              <ListItem onClick={toggleDrawer(false)}>
                <Box
                  component={Link}
                  href="/favorite-users"
                  sx={{ textDecoration: "none", color: "black", width: "100%" }}
                >
                  <ListItemButton>Favorite Users</ListItemButton>
                </Box>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;
