const axios = require("axios");

const Log = require("../logging middleware/logger");
const { getToken } = require("./auth");

const API_URL =
  "http://4.224.186.213/evaluation-service/notifications";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJib3JhbmFyYWh1bDI4QGdtYWlsLmNvbSIsImV4cCI6MTc3OTA5OTU1NiwiaWF0IjoxNzc5MDk4NjU2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYjdmMWM3N2EtMDUzYS00YTVkLWExYzEtYThhYmNhODAzNGMyIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicmFodWwgYm9yYW5hIiwic3ViIjoiNTliMTA0Y2UtZGVkMi00YzRlLThiZTQtZThkOGI5ODliMDNhIn0sImVtYWlsIjoiYm9yYW5hcmFodWwyOEBnbWFpbC5jb20iLCJuYW1lIjoicmFodWwgYm9yYW5hIiwicm9sbE5vIjoidGFhaVx1MDAyNmRzNzQiLCJhY2Nlc3NDb2RlIjoiZnpFUVNRIiwiY2xpZW50SUQiOiI1OWIxMDRjZS1kZWQyLTRjNGUtOGJlNC1lOGQ4Yjk4OWIwM2EiLCJjbGllbnRTZWNyZXQiOiJBbnREeXpIcENubXdmZmFFIn0.9cbstwqTnpvhtvM-URP-mKPP4QKBrUhTLwhcqzyUM4E";

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1
};

function calculatePriority(notification) {

  const weight =
    priorityMap[notification.Type] || 0;

  const recency =
    new Date(notification.Timestamp).getTime();

  return (weight * 1e15) + recency;
}

async function fetchNotifications() {

  let token = ACCESS_TOKEN;

  try {

    const response = await axios.get(
      API_URL,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    await Log(
      "backend",
      "info",
      "service",
      "Fetched notifications successfully",
      token
    );

    return response.data.notifications || response.data || [];

  } catch (error) {

    if (
      error.response?.status === 401 ||
      error.response?.status === 403
    ) {
      token = await getToken();

      const response = await axios.get(
        API_URL,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      await Log(
        "backend",
        "info",
        "service",
        "Fetched notifications successfully",
        token
      );

      return response.data.notifications || response.data || [];
    }

    if (token) {
      await Log(
        "backend",
        "error",
        "service",
        "Failed to fetch notifications",
        token
      );
    }

    console.error(error.response?.data || error.message);

    return [];
  }
}

async function getTop10Notifications() {

  const notifications =
    await fetchNotifications();

  const top10 =
    notifications
      .sort((a, b) =>
        calculatePriority(b) -
        calculatePriority(a)
      )
      .slice(0, 10);

  console.log("\nTop 10 Priority Notifications:\n");

  console.table(
    top10.map((n, index) => ({
      Rank: index + 1,
      Type: n.Type,
      Message: n.Message,
      Timestamp: n.Timestamp
    }))
  );
}

getTop10Notifications();
