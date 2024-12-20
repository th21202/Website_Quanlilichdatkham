// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
import Iconify from "../../../components/Iconify";
import { FormattedMessage } from 'react-intl';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter,
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
  color: theme.palette.error.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.error.dark,
    0
  )} 0%, ${alpha(theme.palette.error.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

export default function AppTotalDoctors() {
  // Sử dụng số cứng thay vì lấy từ API
  const totalDoctors = 20;

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="wpf:medical-doctor" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{totalDoctors}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        <FormattedMessage id={"admin-dashboard.dashboard.total-doctors"} />
      </Typography>
    </RootStyle>
  );
}
