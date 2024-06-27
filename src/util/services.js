export const baseUrl = "http://localhost:8000/v1";

export const postRequest = async (url, body, authUser) => {
  const URL = baseUrl + url;
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key":
        "9bb7a851135545a6005bd79f5f4e33dfb23d46b9e90c281448ef8cc11f2c0c46605fa9dbea510052fed6799537d4df04aa1b28298440b61bc5afa360f7e1fc4b",
      authorization: `${authUser.tokens.accessToken}`,
      "x-client-id": authUser.user._id,
      refreshToken: `${authUser.tokens.refreshToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (data.errCode === 1) {
    let message = data.errMessage;
    return { error: true, message };
  }
  return data;
};

export const getRequest = async (url) => {
  const URL = baseUrl + url;
  const response = await fetch(URL);
  const data = await response.json();
  if (data.errorCode === 1) {
    let message = data.errMessage;
    return { error: true, message };
  }
  return data;
};

export const getRequestHaveBody = async (url, body) => {
  const URL = baseUrl + url;
  const user = localStorage.getItem("user");
  const response = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key":
        "9bb7a851135545a6005bd79f5f4e33dfb23d46b9e90c281448ef8cc11f2c0c46605fa9dbea510052fed6799537d4df04aa1b28298440b61bc5afa360f7e1fc4b",
      authorization: `${user.tokens.accessToken}`,
      "x-client-id": user.user._id,
      refreshToken: `${user.tokens.refreshToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (data.errCode === 1) {
    let message = data.errMessage;
    return { error: true, message };
  }
  return data;
};
