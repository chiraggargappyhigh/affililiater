import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Store } from "../../lib/interfaces";
import { logoutUser } from "../../store/actions";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemButton,
  Drawer,
} from "@mui/material";

import { Dashboard, AttachMoney, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";

const NavItem = ({
  icon,
  text,
  to,
}: {
  icon: any;
  text: string;
  to: string;
}) => {
  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} to={to}>
        <ListItemIcon>{icon}</ListItemIcon>
        <Typography variant="body1">{text}</Typography>
      </ListItemButton>
    </ListItem>
  );
};

const NavItems = [
  {
    icon: <Dashboard />,
    text: "Dashboard",
    to: "/",
  },
  {
    text: "Sales & Earnings",
    icon: <AttachMoney />,
    to: "/sales",
  },
  {
    text: "Payout Details",
    icon: <AttachMoney />,
    to: "/payout",
  },
];

const Nav = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: Store) => state.auth);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch({ type: "RESET_STORE" });
    navigate("/login");
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "300px",
          bgcolor: "background.paper",
          position: "relative",
          height: "100vh",
          overflow: "auto",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          pt: 3,
          pb: 1,
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "primary.main", textAlign: "center" }}
        >
          Affiliater
        </Typography>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {NavItems.map((item, index) => (
              <NavItem key={index} {...item} />
            ))}
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <Typography variant="body1">Logout</Typography>
              </ListItemButton>
            </ListItem>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Nav;
