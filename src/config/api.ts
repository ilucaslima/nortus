import axios from "axios";

export const api = axios.create({
  baseURL: "https://nortus-challenge.api.stage.loomi.com.br",
});
