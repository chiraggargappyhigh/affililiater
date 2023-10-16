import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Store } from "../../lib/interfaces";
import { userService } from "../../services";
import { Transaction } from "../../lib/interfaces/transaction.interface";

import { Grid, Box, Typography, Table } from "@mui/material";
const Sales = () => {
  const { idToken, user } = useSelector((state: Store) => state.auth);
  const [sales, setSales] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      const sales = await userService.fetchUserTransactions(idToken);
      setSales(sales.reverse());
    };
    fetchSales();
  }, [idToken]);

  return (
    <Box sx={{ width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4}>
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
            <Typography variant="h6">Total Sales</Typography>
            <Typography variant="body1">
              $
              {user?.total_sales?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || "0.00"}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {sales.map((sale, index) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRadius: 4,
            p: 2,
            mt: 2,
            color: "primary.main",
          }}
          key={index}
        >
          <Grid container>
            <Grid item xs={6}>
              <Typography>Sale Details</Typography>
              <Typography variant="body1">App: {sale.app}</Typography>
              <Typography variant="body1">Date: {sale.saleDate}</Typography>
              <Typography variant="body1">
                {sale.salesCurrency} -{" "}
                {(sale.saleAmount / 100)?.toLocaleString("en", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Comission Details</Typography>
              <Typography variant="body1">
                {sale.salesCurrency} -{" "}
                {sale.comission?.inCurrency?.toLocaleString("en", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
              <Typography variant="body1">
                USD -{" "}
                {sale.comission?.inUSD?.toLocaleString("en", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default Sales;
