
const axios = require("axios");
const app = require("express")();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();


function processProfile(p, arg) {

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

    return axios
      .post("https://app.socialinsider.io/api", data, config)
      .then((resApi) => {
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
              totalFans += arr[idx].followers ? arr[idx].followers : 0;
            }

            const res = {
              totalEngagement: totalEngagement,
              totalFans: totalFans,
            };
         
            return res;
          } else {
            const res = {
              totalEngagement: 0,
              totalFans: 0,
            };
    
            return res;
          }
   
      })
      .catch((err) => {
        // console.log(err);
      })
}

function processBrand(brand, arg) {
    const profiles = brand.profiles;

    const stats = Promise.all(profiles.map(processProfile, {start: this.start}));
   
    return stats.then((s) => {

      var totalEngagement = 0;
      var totalFans = 0;
      s.forEach(i => {
          totalEngagement += i.totalEngagement;
          totalFans += i.totalFans;
      });
   
      const b = {
        name: brand.brandname,
        totalProfiles: profiles.length,
        totalEngagement: totalEngagement,
        totalFans: totalFans,
      };
      return b;
    });
}

app.post("/", jsonParser, (req, res) => {

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
     
      var brandResults = Promise.all(result.map(processBrand, {start: Number(req.body.date)}));

      brandResults.then((a) => {
      
        // console.log(a);
        res.send(a);
      });
    })
    .catch((err) => {
      // console.log(err);
      res.send(err);
    });
});


const hostname = "127.0.0.1";
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
