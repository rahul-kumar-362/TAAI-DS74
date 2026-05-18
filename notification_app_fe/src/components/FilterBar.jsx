import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography
} from "@mui/material";
import { notificationTypes } from "../services/api.js";

function FilterBar({
  selectedType,
  onTypeChange,
  totalCount,
  unreadCount
}) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "space-between"
        }}
      >
        <Box>
          <Typography variant="h6">Notification Feed</Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
            <Chip label={`${totalCount} total`} size="small" />
            <Chip
              label={`${unreadCount} unread`}
              size="small"
              color={unreadCount > 0 ? "secondary" : "default"}
            />
          </Stack>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            overflowX: "auto",
            pb: { xs: 0.5, md: 0 },
            width: { xs: "100%", md: "auto" }
          }}
        >
          {notificationTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "contained" : "outlined"}
              onClick={() => onTypeChange(type)}
              sx={{ flex: "0 0 auto" }}
            >
              {type}
            </Button>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default FilterBar;
