import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav";
import { Grid } from "@mui/material";
const DashboardLayout = () => {
  return (
    <Grid container>
      <Grid item xs={4} md={3} lg={2}>
        <Nav />
      </Grid>
      <Grid
        item
        xs={8}
        md={9}
        lg={10}
        sx={{
          px: 2,
          py: 3,
        }}
      >
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;
