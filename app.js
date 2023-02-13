const http = require("http");

const axios = require("axios");
const app = require("express")();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

app.get("/", (req, res) => {
  const data = {
    jsonrpc: "2.0",
    id: 0,
    method: "socialinsider_api.get_brands",
    params: {
      projectname: "API_test",
    },
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer API_KEY_TEST",
    },
  };

  axios
    .post("https://app.socialinsider.io/api", data, config)
    .then((resApi) => {
        res.send(resApi.data);

    })
    .catch((err) => {
        res.send(err);

    });
});

app.post("/", jsonParser, (req, res) => {
  const body = {
    "id":"44596321012",
    "profile_type": "facebook_page",
    "date":{
        "start": 1608209422374,
        "end": 1639745412436,
        "timezone": "Europe/London"
    }
  };

  const data = {
    jsonrpc: "2.0",
    id: 1,
    method: "socialinsider_api.get_profile_data",
    params: {
      projectname: "API_test",
      id: req.body.id,
      profile_type: req.body.profile_type,
      date: req.body.date
    },
    
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer API_KEY_TEST",
    },
  };

  axios
    .post("https://app.socialinsider.io/api", data, config)
    .then((resApi) => {
        res.send(resApi.data);

    })
    .catch((err) => {
        res.send(err);
    });
});


const hostname = "127.0.0.1";
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
