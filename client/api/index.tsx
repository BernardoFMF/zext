import axios from "axios";
import cookies from "js-cookie";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT

const userBase = `${base}/api/users`
const loggedUserBase = `${base}/api/users/logged`
const authBase = `${base}/api/auth/`;

export function registerUser(payload: { username: string, password: string, email: string, confirmPassword: string}) {
    return axios.post(userBase, payload)
        .then(res => res.data)
}

export function login(payload: { email: string; password: string }) {
    return axios
      .post(authBase + "login", payload, {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem("accessToken", JSON.stringify(res.data))
        cookies.set("accessToken", res.data, {
            expires: 1,
            domain: "localhost", //change this when deploying 54:30
            path: "/",
            sameSite: "strict",
            secure: false //put true when deploying
        })
        return res.data
      });
}

export function getMe() {
    return axios
      .get(loggedUserBase, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch(() => {
        return null;
      });
}

export function logout() {
  cookies.remove("accessToken", {
    domain: "localhost", //change this when deploying 54:30
    path: "/",
  })
}