import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "All Notifications", to: "/notifications" },
  { label: "Priority", to: "/priority" }
];

function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary"
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 72, sm: 76 },
            gap: 2,
            justifyContent: "space-between"
          }}
        >
          <Box>
            <Typography variant="h6" component="div">
              Campus Notifications
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AffordMed evaluation dashboard
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={NavLink}
                to={item.to}
                sx={{
                  color: "text.secondary",
                  px: 2,
                  "&.active": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText"
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Toolbar>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            display: { xs: "flex", sm: "none" },
            pb: 1.5,
            overflowX: "auto"
          }}
        >
          {navItems.map((item) => (
            <Button
              key={item.to}
              component={NavLink}
              to={item.to}
              size="small"
              sx={{
                color: "text.secondary",
                flex: "0 0 auto",
                "&.active": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText"
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Container>
    </AppBar>
  );
}

export default Navbar;
