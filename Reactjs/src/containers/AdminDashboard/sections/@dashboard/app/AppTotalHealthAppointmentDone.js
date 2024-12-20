import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
import { fShortenNumber } from "../../../utils/formatNumber";
import Iconify from "../../../components/Iconify";
import React from "react";
import { FormattedMessage } from 'react-intl';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter,
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.warning.dark,
    0
  )} 0%, ${alpha(theme.palette.warning.dark, 0.24)} 100%)`,
}));

export default function AppTotalHealthAppointmentDone() {
  // Sử dụng số liệu tĩnh thay vì gọi API
  const staticTotalAppointments = 150;

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="icon-park:appointment" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">
        {fShortenNumber(staticTotalAppointments)}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        <FormattedMessage id={"admin-dashboard.dashboard.total-health-appointment-done"} />
      </Typography>
    </RootStyle>
  );
}