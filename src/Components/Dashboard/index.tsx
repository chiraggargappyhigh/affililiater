import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NodeEnv, Store } from "../../lib/interfaces";
import {
  Typography,
  Box,
  Grid,
  IconButton,
  Divider,
  Avatar,
} from "@mui/material";
import { CopyAll } from "@mui/icons-material";
import { fetchApps, fetchUserApps } from "../../store/actions";
import { config } from "../../lib/config";
import { toast } from "react-toastify";
import AffiliateAddApp from "../DIalogs/AffiliateAddApp";

const DashboardHome = () => {
  const { user, userApps } = useSelector((state: Store) => ({
    ...state.auth,
    ...state.app,
  }));
  const [liveData, setLiveData] = useState<boolean>(false);
  const dispatch = useDispatch();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  useEffect(() => {
    setLiveData(config.nodeEnv === NodeEnv.Production);
  }, []);

  useEffect(() => {
    dispatch(fetchApps());
    dispatch(fetchUserApps({ liveData }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    console.log(userApps);
  }, [userApps]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            width: "100v%",
          }}
        >
          <Typography variant="h4">Welcome {user?.name}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                py: 2,
                px: 1,
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background.paper",
                color: "primary.main",
                gap: 2,
              }}
            >
              <Typography variant="h6">Total Earnings</Typography>
              <Typography variant="body1">
                $
                {user?.total_earning?.toLocaleString("en", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || "0.00"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                py: 2,
                px: 1,
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background.paper",
                color: "primary.main",
                gap: 2,
              }}
            >
              <Typography variant="h6">Total Referrals</Typography>
              <Typography variant="body1">
                {user?.total_referrals || "0"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h5">Affiliated Apps</Typography>
        <AffiliateAddApp isLive={liveData} />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {userApps?.length ? (
            <>
              {userApps.map((app, index) => (
                <Grid item xs={12} md={6} lg={4} key={`${app.id}-${index}`}>
                  <Box
                    sx={{
                      py: 1,
                      px: 2,
                      borderRadius: 4,
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "background.paper",
                      color: "primary.main",
                      gap: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Avatar
                        src={app.app.logo}
                        sx={{
                          width: "1.5rem",
                          height: "1.5rem",
                          fontSize: "0.75rem",
                        }}
                      >
                        {app.app.name?.at(0) || "T"}
                      </Avatar>
                      <Typography variant="h6">
                        {app.app.name || "TEST"}
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      {app.app.description || "TEST"}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body1">
                        Earned: $
                        {app.earnings?.toLocaleString("en", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }) || "0.00"}
                      </Typography>
                      <Divider orientation="vertical" flexItem />
                      <Typography variant="body1">
                        Referrals:{app.referrals || "0"}
                      </Typography>
                      <Divider orientation="vertical" flexItem />
                      <Box
                        sx={{ display: "flex", gap: 1, alignItems: "center" }}
                      >
                        <Typography variant="caption">
                          {app.promotion_code}
                        </Typography>
                        <IconButton
                          onClick={() => copyToClipboard(app.promotion_code)}
                        >
                          <CopyAll
                            sx={{
                              fontSize: "1rem",
                            }}
                          />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </>
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1">
                You have not added any apps yet
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardHome;
