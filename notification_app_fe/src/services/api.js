import axios from "axios";

const API_BASE_URL = "/evaluation-service";

const authPayload = {
  email: import.meta.env.VITE_AFFORDMED_EMAIL || "",
  name: import.meta.env.VITE_AFFORDMED_NAME || "",
  rollNo: import.meta.env.VITE_AFFORDMED_ROLL_NO || "",
  accessCode: import.meta.env.VITE_AFFORDMED_ACCESS_CODE || "",
  clientID: import.meta.env.VITE_AFFORDMED_CLIENT_ID || "",
  clientSecret: import.meta.env.VITE_AFFORDMED_CLIENT_SECRET || ""
};

let cachedToken = import.meta.env.VITE_AFFORDMED_ACCESS_TOKEN || "";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json"
  }
});

export const notificationTypes = ["All", "Placement", "Result", "Event"];

export const priorityRank = {
  Placement: 3,
  Result: 2,
  Event: 1
};

export function getNotificationId(notification) {
  return [
    notification.Type,
    notification.Message,
    notification.Timestamp
  ].join("|");
}

export function sortNewestFirst(notifications) {
  return [...notifications].sort(
    (a, b) => new Date(b.Timestamp) - new Date(a.Timestamp)
  );
}

export function sortByPriority(notifications) {
  return [...notifications].sort((a, b) => {
    const priorityDifference =
      (priorityRank[b.Type] || 0) - (priorityRank[a.Type] || 0);

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });
}

export function filterByType(notifications, type) {
  if (!type || type === "All") {
    return notifications;
  }

  return notifications.filter((notification) => notification.Type === type);
}

function extractToken(data) {
  return (
    data?.access_token ||
    data?.accessToken ||
    data?.token ||
    data?.authToken
  );
}

export async function getAccessToken(forceRefresh = false) {
  if (cachedToken && !forceRefresh) {
    return cachedToken;
  }

  const missingField = Object.entries(authPayload).find(
    ([, value]) => !value
  );

  if (missingField) {
    throw new Error(
      `Missing Vite environment value for ${missingField[0]}`
    );
  }

  const response = await apiClient.post("/auth", authPayload, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  const token = extractToken(response.data);

  if (!token) {
    throw new Error("Auth response did not include an access token");
  }

  cachedToken = token;
  return cachedToken;
}

export async function fetchNotifications() {
  let token = await getAccessToken();

  try {
    const response = await apiClient.get("/notifications", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = response.data?.notifications || response.data || [];

    if (!Array.isArray(data)) {
      return [];
    }

    return data;
  } catch (error) {
    if (
      error.response?.status !== 401 &&
      error.response?.status !== 403
    ) {
      throw error;
    }

    token = await getAccessToken(true);

    const response = await apiClient.get("/notifications", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = response.data?.notifications || response.data || [];

    if (!Array.isArray(data)) {
      return [];
    }

    return data;
  }
}
