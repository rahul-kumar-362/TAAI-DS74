import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography
} from "@mui/material";

const typeColor = {
  Placement: "primary",
  Result: "secondary",
  Event: "success"
};

function formatTimestamp(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value || "No timestamp";
  }

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

function NotificationCard({ notification, isUnread, onMarkViewed }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderColor: isUnread ? "secondary.main" : "divider",
        bgcolor: isUnread ? "rgba(191, 74, 48, 0.06)" : "background.paper"
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2
          }}
        >
          <Chip
            label={notification.Type || "General"}
            color={typeColor[notification.Type] || "default"}
            size="small"
          />
          {isUnread && (
            <Chip label="Unread" color="secondary" size="small" />
          )}
        </Stack>

        <Typography
          variant="h6"
          sx={{
            mb: 1,
            lineHeight: 1.25,
            overflowWrap: "anywhere"
          }}
        >
          {notification.Message || "Untitled notification"}
        </Typography>

        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: "1px solid",
            borderColor: "divider"
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {formatTimestamp(notification.Timestamp)}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          size="small"
          variant={isUnread ? "contained" : "outlined"}
          onClick={onMarkViewed}
          disabled={!isUnread}
        >
          {isUnread ? "Mark as viewed" : "Viewed"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default NotificationCard;
