const axios = require("axios");

const AUTH_URL = "http://4.224.186.213/evaluation-service/auth";

const authPayload = {
  email: "boranarahul28@gmail.com",
  name: "rahul borana",
  rollNo: "taai&ds74",
  accessCode: "fzEQSQ",
  clientID: "59b104ce-ded2-4c4e-8be4-e8d8b989b03a",
  clientSecret: "AntDyzHpCnmwffaE"
};

function extractToken(data) {
  return (
    data?.access_token ||
    data?.accessToken ||
    data?.token ||
    data?.authToken
  );
}

async function getToken(options = {}) {

  const { verbose = false } = options;

  try {

    if (verbose) {
      console.log("Sending Payload:");
      console.log(authPayload);
    }

    const response = await axios.post(
      AUTH_URL,
      authPayload,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );

    if (verbose) {
      console.log("\nTOKEN RESPONSE:\n");
      console.log(response.data);
    }

    const token = extractToken(response.data);

    if (!token) {
      throw new Error(
        "Auth succeeded but no token field was found in the response"
      );
    }

    return token;

  } catch (error) {

    console.error(
      "\nERROR:\n",
      error.response?.data || error.message
    );

    throw error;

  }
}

if (require.main === module) {
  getToken({ verbose: true }).catch(() => {
    process.exitCode = 1;
  });
}

module.exports = {
  getToken,
  authPayload
};
