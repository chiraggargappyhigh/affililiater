import React, { FC, useState, useEffect } from "react";
import {
  Dialog,
  Box,
  Typography,
  DialogTitle,
  DialogContent,
  Button,
  Grid,
  Paper,
  Avatar,
  Chip,
} from "@mui/material";
import { useSelector } from "react-redux";
import { App, Store } from "../../lib/interfaces";
import { Add, Close, Home } from "@mui/icons-material";
import { appService } from "../../services";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface AppGridProps {
  apps: App[];
  setSelectedApp: (app: App) => void;
  isLive: boolean;
}
const AppGrid: FC<AppGridProps> = ({ apps, setSelectedApp, isLive }) => {
  return (
    <Grid container spacing={2}>
      {apps.map((app) => (
        <Grid item xs={12} md={6} lg={4} key={app.id}>
          <Box
            onClick={() => setSelectedApp(app)}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
              py: 1,
              cursor: "pointer",
            }}
            component={Paper}
            elevation={2}
          >
            <Avatar
              src={app.logo}
              sx={{ width: "1.5rem", height: "1.5rem", fontSize: "0.75rem" }}
            >
              {app.name?.at(0) || "T"}
            </Avatar>
            <Typography variant="body1">{app.name}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

interface SingleAppProps {
  app: App;
  setSelectedApp: (app: App) => void;
  handleGetAffiliated: () => void;
}

const SingleApp: FC<SingleAppProps> = ({
  app,
  setSelectedApp,
  handleGetAffiliated,
}) => {
  return (
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
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Avatar
            src={app.logo}
            sx={{ width: "1.5rem", height: "1.5rem", fontSize: "0.75rem" }}
          >
            {app.name?.at(0) || "T"}
          </Avatar>
          <Typography variant="body1">{app.name || "Test"}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              handleGetAffiliated(app.id);
            }}
          >
            Get Affiliated
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setSelectedApp(null);
            }}
          >
            <Close />
          </Button>
        </Box>
      </Box>
      <Typography variant="body2">
        {app.description || "Test Description"}
      </Typography>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        {app.homepage && (
          <Link to={app.homepage} target="_blank">
            <Chip
              label="Homepage"
              color="primary"
              icon={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "background.paper",
                    borderRadius: "50%",
                    width: "1.5rem",
                    height: "1.5rem",
                  }}
                >
                  <Home
                    color="primary"
                    sx={{
                      fontSize: "1.2rem",
                    }}
                  />
                </Box>
              }
            />
          </Link>
        )}
        {app.privacy_policy && (
          <Link to={app.privacy_policy} target="_blank">
            <Chip
              label="Privacy Policy"
              color="primary"
              icon={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "background.paper",
                    borderRadius: "50%",
                    width: "1.5rem",
                    height: "1.5rem",
                  }}
                >
                  <Home
                    color="primary"
                    sx={{
                      fontSize: "1.2rem",
                    }}
                  />
                </Box>
              }
            />
          </Link>
        )}
        {app.terms_of_service && (
          <Link to={app.terms_of_service} target="_blank">
            <Chip
              label="Terms of Service"
              color="primary"
              icon={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "background.paper",
                    borderRadius: "50%",
                    width: "1.5rem",
                    height: "1.5rem",
                  }}
                >
                  <Home
                    color="primary"
                    sx={{
                      fontSize: "1.2rem",
                    }}
                  />
                </Box>
              }
            />
          </Link>
        )}
      </Box>
    </Box>
  );
};

interface Props {
  isLive: boolean;
}
const AffiliateAddApp: FC<Props> = ({ isLive }) => {
  const [open, setOpen] = useState(false);
  const { idToken, apps, userApps } = useSelector((state: Store) => ({
    ...state.auth,
    ...state.app,
  }));
  const [unAffiliatedApps, setUnAffiliatedApps] = useState<App[]>([]);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);

  const handleGetAffiliated = async (appId: string) => {
    try {
      const res = await appService.getAffiliated(idToken, appId, isLive);
      console.log(res);
      window.location.reload();
    } catch (e) {
      toast.error(e.message || "Something went wrong");
      console.log(e);
      setSelectedApp(null);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (idToken) {
      const unAffiliatedApps = apps.filter(
        (app) => !userApps.find((userApp) => userApp.app.id === app.id)
      );
      setUnAffiliatedApps(unAffiliatedApps);
    }
  }, [idToken, apps, userApps]);

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ mt: 2 }}
        startIcon={<Add />}
      >
        Add App
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add App</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            {unAffiliatedApps.length === 0 ? (
              <Typography variant="body1">
                Looks like you have added all the apps
              </Typography>
            ) : (
              <>
                {selectedApp ? (
                  <SingleApp
                    app={selectedApp}
                    setSelectedApp={setSelectedApp}
                    handleGetAffiliated={handleGetAffiliated}
                  />
                ) : (
                  <AppGrid
                    apps={unAffiliatedApps}
                    setSelectedApp={setSelectedApp}
                    isLive={isLive}
                  />
                )}
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AffiliateAddApp;
