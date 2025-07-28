import React from "react";
import { Card, Grid, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import QrCodeIcon from '@mui/icons-material/QrCode';
// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

const IconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 50,
  height: 50,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.light,
}));

export default function OrderManagement() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Add Order",
      value: "Add",
      icon: "add_shopping_cart",
      path: "/orders/AddFrom",
    },
    {
      title: "Update Order",
      value: "Update",
      icon: "update",
      path: "/orders/UpdateForm",
    },
    // {
    //   title: "Track Order",
    //   value: "Track",
    //   icon: "track_changes",
    //   path: "/orders/track",
    // },
    {
      title: "Products",
      value: "Add",
      icon: "inventory",
      path: "/products/add",
    },
    {
      title: "Products",
      value: "Update",
      icon: "update",
      path: "/products/update",
    },
    {
      title: "Issue",
      value: "Items",
      icon: "star",
      path: "/products/issue",
    },
    {
      title: "Update Issue",
      value: "Items",
      icon: "update",
      path: "/products/updateissue",
    },{
      title: "Generate QR",
      value: "QR Code",
      icon: <QrCodeIcon />,
      path: "/generate-qr"
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Box sx = {{ mt:2, p:2}}>
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <StyledCard onClick={() => handleCardClick(card.path)}>
            <Box>
              <Typography variant="h6" color="textSecondary">
                {card.title}
              </Typography>
              <Typography variant="h5" color="primary">
                {card.value}
              </Typography>
            </Box>
            <IconBox>
              <span className="material-icons" style={{ color: "#fff" }}>
                {card.icon}
              </span>
            </IconBox>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
    </Box>
  );
}
