import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/activity";
import { history } from "../../index";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";
import { IPhoto, IProfile } from "../models/Profile";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure Api is running!");
  }

  const { status, data, config } = error.response!;
  if (status === 400) {
    history.push("/notfound");
  }

  if (
    status === 404 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }

  if (status === 500) {
    toast.error("Server errror - check the terminal for more info!");
  }

  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

// const sleep = (ms: number) => (response: AxiosResponse) => {
//   return new Promise<AxiosResponse>((resolve) =>
//     setTimeout(() => resolve(response), ms)
//   );
// };
const request = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) =>
    axios.get(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, file: Blob) =>{
    let formData = new FormData();
    formData.append('File', file);
    return axios.post(url, formData, {
      headers: {'Content-type' : 'multipart/form-data'}
    }).then(responseBody)
  }
};

const Activities = {
  list: (): Promise<IActivity[]> => request.get("/activities"),
  details: (id: string) => request.get(`/activities/${id}`),
  create: (activity: IActivity) => request.post(`/activities`, activity),
  update: (activity: IActivity) =>
    request.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.del(`/activities/${id}`),
  attend: (id: string) => request.post(`/activities/${id}/attend`, {}),
  unattend: (id: string) => request.del(`/activities/${id}/attend`),
};

const User = {
  current: (): Promise<IUser> => request.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    request.post("/user/login", user),
  register: (user: IUserFormValues): Promise<IUser> =>
    request.post("/user/register", user),
  fbLogin: (accessToken: string) => 
    request.post(`/user/facebook`, {accessToken}),
};

const Profiles ={
  get: (username: string): Promise<IProfile> =>request.get(`/profiles/${username}`),
  uploadPhoto: (photo: Blob): Promise<IPhoto> => request.postForm(`/photos`, photo),
  setMainPhoto: (id: string) => request.post(`/post/${id}/setMain`, {}),
  deletePhoto: (id: string) => request.del(`/photos/${id}`),
  follow: (username: string) => request.post(`/profiles/${username}/follow`, {}),
  unfollow: (username: string) => request.del(`/profiles/${username}/follow`),
  listFollowings: (username: string, predicate: string) => request.get(`/profiles/${username}/follow?predicate=${predicate}`)
};

const activities = { Activities, User, Profiles};
export default activities;
