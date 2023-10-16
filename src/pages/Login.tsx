import React, { useEffect, useState } from "react";
import { Typography, Box, Paper, Button, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/actions";
import { UserType, Store } from "../lib/interfaces";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userType, setUserType] = useState<UserType>(UserType.affiliate);
  const { user, idToken } = useSelector((state: Store) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && idToken) {
      navigate("/");
    }
  }, [user, idToken, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Paper
        sx={{
          width: "30%",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h5">Welcome to Affiliater</Typography>
        {/* <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <Typography variant="body1">Login as</Typography>
          <Chip
            label="Admin"
            onClick={() => setUserType(UserType.admin)}
            color={userType === UserType.admin ? "primary" : "default"}
          />
          <Chip
            label="Affiliate"
            onClick={() => setUserType(UserType.affiliate)}
            color={userType === UserType.affiliate ? "primary" : "default"}
          />
        </Box> */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(loginUser(userType))}
        >
          Login as {UserType[userType]}
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
