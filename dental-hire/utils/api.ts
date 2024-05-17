import axios from "axios";
import { L_STORAGE_AUTH_TOKEN, PATH_MAPPER } from "./constants";

const api = axios.create({
  adapter: ["xhr", "http", "https"],
  baseURL: "http://172.105.152.69/webapi",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const l_local: string = localStorage.getItem(L_STORAGE_AUTH_TOKEN) ?? "";
    const l_session: string =
      sessionStorage.getItem(L_STORAGE_AUTH_TOKEN) ?? "";

    const token: string = (l_local + l_session).replaceAll('"', "");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      if(window.location.pathname == '/') window.location.replace(PATH_MAPPER.dashboard);
    } else if(window.location.pathname == PATH_MAPPER.dashboard || window.location.pathname == PATH_MAPPER.donate || window.location.pathname == PATH_MAPPER.findProfessionals || window.location.pathname == PATH_MAPPER.bookings || window.location.pathname == PATH_MAPPER.messages || window.location.pathname == PATH_MAPPER.jobPosting) {
      window.location.replace(PATH_MAPPER.signin);
    }

    if (
      localStorage.getItem("expireTime") &&
      Date.now() >= Number(localStorage.getItem("expireTime"))
    ) {
      localStorage.setItem("expireTime", "");
      localStorage.setItem(L_STORAGE_AUTH_TOKEN, "");
      sessionStorage.setItem(L_STORAGE_AUTH_TOKEN, "");
      window.location.replace(PATH_MAPPER.signin);
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  }
);

export default api;
