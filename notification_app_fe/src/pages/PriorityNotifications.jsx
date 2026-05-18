import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import FilterBar from "../components/FilterBar.jsx";
import NotificationCard from "../components/NotificationCard.jsx";
import {
  fetchNotifications,
  filterByType,
  getNotificationId,
  sortByPriority
} from "../services/api.js";

const VIEWED_STORAGE_KEY = "affordmed-viewed-notifications";

function readViewedIds() {
  try {
    return JSON.parse(localStorage.getItem(VIEWED_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function PriorityNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [viewedIds, setViewedIds] = useState(readViewedIds);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotifications = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchNotifications();
      setNotifications(sortByPriority(data));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (err.message === "Network Error"
            ? "Unable to reach the notifications API. Check the dev-server proxy and network connection."
            : "") ||
          err.message ||
          "Unable to load priority notifications"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      VIEWED_STORAGE_KEY,
      JSON.stringify(viewedIds)
    );
  }, [viewedIds]);

  const visibleNotifications = useMemo(
    () => filterByType(notifications, selectedType),
    [notifications, selectedType]
  );

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (notification) =>
          !viewedIds.includes(getNotificationId(notification))
      ).length,
    [notifications, viewedIds]
  );

  const markViewed = (notification) => {
    const id = getNotificationId(notification);
    setViewedIds((current) =>
      current.includes(id) ? current : [...current, id]
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "flex-end" },
          mb: 3
        }}
      >
        <Box>
          <Typography variant="h4">Priority Notifications</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Sorted by Placement, Result, Event, then newest first.
          </Typography>
        </Box>
        <Button variant="outlined" onClick={loadNotifications}>
          Refresh
        </Button>
      </Stack>

      <FilterBar
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        totalCount={notifications.length}
        unreadCount={unreadCount}
      />

      {loading && (
        <Stack alignItems="center" sx={{ py: 8 }}>
          <CircularProgress />
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Loading priority notifications
          </Typography>
        </Stack>
      )}

      {!loading && error && (
        <Alert severity="error" action={
          <Button color="inherit" size="small" onClick={loadNotifications}>
            Retry
          </Button>
        }>
          {error}
        </Alert>
      )}

      {!loading && !error && visibleNotifications.length === 0 && (
        <Alert severity="info">
          No priority notifications found for the selected filter.
        </Alert>
      )}

      {!loading && !error && visibleNotifications.length > 0 && (
        <Grid container spacing={2.5}>
          {visibleNotifications.map((notification) => {
            const id = getNotificationId(notification);
            const isUnread = !viewedIds.includes(id);

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={id}>
                <NotificationCard
                  notification={notification}
                  isUnread={isUnread}
                  onMarkViewed={() => markViewed(notification)}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
}

export default PriorityNotifications;
