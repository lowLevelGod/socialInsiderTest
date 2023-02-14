const http = require("http");

const axios = require("axios");
const app = require("express")();
const bodyParser = require("body-parser");
const { resolve } = require("path");
const jsonParser = bodyParser.json();

function getProfileData(id, profile_type, date) {
  return new Promise((resolveMain) => {
    const body = {
      id: id,
      profile_type: profile_type,
      date: date,
    };

    const data = {
      jsonrpc: "2.0",
      id: 1,
      method: "socialinsider_api.get_profile_data",
      params: {
        projectname: "API_test",
        id: body.id,
        profile_type: body.profile_type,
        date: body.date,
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
        return new Promise((resolve) => {
          const result = JSON.parse(JSON.stringify(resApi.data.resp));

          const keys = Object.keys(result);

          const arr = result[keys[0]];
          const dates = Object.keys(arr);

          var totalEngagement = 0;
          var totalFans = 0;
          for (let i = 0; i < dates.length; ++i) {
            const idx = dates[i];
            totalEngagement += arr[idx].engagement;
            // totalFans += arr[idx].fans;
          }

          const res = {
            totalEngagement: totalEngagement,
            totalFans: totalFans,
          };
          // console.log(res, "profile data");
          resolve(res);
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  });
}

function processProfile(p, arg) {
  return new Promise((resolve) => {
    // console.log("Procesam profil");
    const date = {
      // start: new Date(p.profile_added).getTime(),
      start: this.start,
      end: 1639745412436,
      timezone: "Europe/London",
    };

    // const stats = getProfileData(p.id, p.profile_type, date);

    const body = {
      id: p.id,
      profile_type: p.profile_type,
      date: date,
    };

    const data = {
      jsonrpc: "2.0",
      id: 1,
      method: "socialinsider_api.get_profile_data",
      params: {
        projectname: "API_test",
        id: body.id,
        profile_type: body.profile_type,
        date: body.date,
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
        return new Promise((resolve) => {
          // const result = JSON.parse(JSON.stringify(resApi.data.resp));

          const result = resApi.data.resp;
          if (result) {
            const keys = Object.keys(result);

            const arr = result[keys[0]];
            const dates = Object.keys(arr);

            var totalEngagement = 0;
            var totalFans = 0;
            for (let i = 0; i < dates.length; ++i) {
              const idx = dates[i];
              totalEngagement += arr[idx].engagement ? arr[idx].engagement : 0;
              // totalFans += arr[idx].fans;
            }

            const res = {
              totalEngagement: totalEngagement,
              totalFans: totalFans,
            };
            // console.log(res, "profile data");
            resolve(res);
          } else {
            const res = {
              totalEngagement: 0,
              totalFans: 0,
            };
            // console.log(res, "profile data");
            resolve(res);
          }
        });
      })
      .catch((err) => {
        // console.log(err);
      })
      .then(a => {
        resolve(a);
      });
      
    // stats.then((s) => {
    //   console.log(stats);

    //   console.log(stats, "Am procesat profil");
    //   console.log(s, "un singur stat");
    //   resolve(s);
    // });
  });
}

function processBrand(brand, arg) {
  return new Promise((resolve) => {
    const profiles = brand.profiles;
    // console.log("Procesam brand");
    const stats = Promise.all(profiles.map(processProfile, {start: this.start}));
    // console.log(stats, "am procesat brand cu succes");
    stats.then((s) => {
      // console.log(s, "array cu stats");
      var totalEngagement = 0;
      var totalFans = 0;
      s.forEach(i => {
          totalEngagement += i.totalEngagement;
          totalFans += i.totalFans;
      });
      // console.log("Am procesat brand");
      const b = {
        name: brand.brandname,
        totalProfiles: profiles.length,
        totalEngagement: totalEngagement,
        totalFans: totalFans,
      };
      resolve(b);
    });
  });
}

app.post("/", jsonParser, (req, res) => {
  // console.log(req.body.date);
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
      const result = resApi.data.result;
      // console.log("Incepem procesare brandurilor");
      var brandResults = Promise.all(result.map(processBrand, {start: Number(req.body.date)}));
      // console.log(brandResults, "am procest toate brandurile");
      brandResults.then((a) => {
        // console.log("Luam toate brandurile si le returnam procesate!!!!");
        // console.log(a);
        res.send(a);
      });
    })
    .catch((err) => {
      // console.log(err);
      res.send(err);
    });
});

// app.post("/", jsonParser, (req, res) => {
//   const body = {
//     id: "44596321012",
//     profile_type: "facebook_page",
//     date: {
//       start: 1608209422374,
//       end: 1639745412436,
//       timezone: "Europe/London",
//     },
//   };

//   const data = {
//     jsonrpc: "2.0",
//     id: 1,
//     method: "socialinsider_api.get_profile_data",
//     params: {
//       projectname: "API_test",
//       id: req.body.id,
//       profile_type: req.body.profile_type,
//       date: req.body.date,
//     },
//   };

//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer API_KEY_TEST",
//     },
//   };

//   axios
//     .post("https://app.socialinsider.io/api", data, config)
//     .then((resApi) => {
//       res.send(resApi.data);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

const hostname = "127.0.0.1";
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
