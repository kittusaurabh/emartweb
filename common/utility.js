const xlsx = require("xlsx");
var axios = require("axios");
const ONESIGNAL_APP_ID = "cf9830e1-cb41-4f04-b3fc-a69615de339b";
let key = "ZDZiMzRlZDctODNhZC00NTAyLTk0NGUtNDE0MTA3ZjAyYTcw";

exports.exel2json = (sheet) => {
  const file = xlsx.readFile("public/sheet/" + sheet);
  let data = [];
  const sheets = file.SheetNames;
  for (let i = 0; i < sheets.length; i++) {
    const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      data.push(res);
    });
  }
  return data;
};

exports.randomString = (length) => {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return "DP" + result.toUpperCase();
};

exports.distance_of_two_cordinates = function (lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

exports.sendNotification = async (payload) => {
  var config = {
    method: "post",
    url: "https://onesignal.com/api/v1/notifications",
    headers: {
      Authorization: "Basic " + key,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      include_player_ids: payload.playerIds,
      contents: {
        en: payload.contents,
        es: payload.contents,
      },
      name: payload.name,
      app_id: ONESIGNAL_APP_ID,
    }),
  };

  let resp = await axios(config);
  if (resp.data) {
    return true;
  } else {
    return false;
  }
};
