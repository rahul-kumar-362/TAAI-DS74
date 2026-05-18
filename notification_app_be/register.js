const axios = require("axios");

async function register() {

  try {

    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/register",
      {
        email: "boranarahul28@gmail.com",
        name: "Rahul Borana",
        mobileNo: "9172405937",
        githubUsername: "rahul-kumar-362",
        rollNo: "TAAI&DS74",
        accessCode: "fzEQSQ"
      }
    );

    console.log(response.data);

  } catch (error) {

    console.error(
      error.response?.data || error.message
    );

  }
}

register();