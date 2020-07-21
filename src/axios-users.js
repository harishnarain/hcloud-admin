import axios from "axios";

const instance = axios.create({
  baseURL: "https://graph.microsoft.com/beta/",
});

export default instance;
