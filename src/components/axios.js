import axios from "axios";

const instance = axios.create({
  baseURL: "http://ec2-35-83-63-15.us-west-2.compute.amazonaws.com:8000",
});

export default instance;
