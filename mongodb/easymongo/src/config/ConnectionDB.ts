import { connect } from "mongoose";

const ConnectionDB = () => {
  const URL = String(process.env.URL_MONGO);
  connect(URL)
    .then(() => {
        console.log("Neat connection", URL);
    })
    .catch((e) => {
      console.log(e);
    });
};

export default ConnectionDB;
