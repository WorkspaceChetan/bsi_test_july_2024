"use client";

import { Box, styled } from "@mui/material";

export const UserDetailsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(3),
  padding: theme.spacing(3),
}));

export const UserDetailsTable = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  maxWidth: 700,
  width: "100%",
}));

export const UserDetailsTableItem = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  justifyContent: "space-between",
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
}));

export const UserDetailsTableItemHeader = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
}));
