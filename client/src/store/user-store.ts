import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";
import UserService from "../services/UserService";
import $api from "../http";

export default class Store {
  user = {} as IUser;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  async loginF(email: string, password: string) {
    try {
      const response = await AuthService.loginF(email, password);
      localStorage.setItem("token", response.data.token);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      throw error;
    }
  }

  async registration(
    login: string,
    name: string,
    surname: string,
    email: string,
    password: string,
    birthday: Date,
    cell: string,
    city: string,
    gender: string,
    genres: string[],
    instruments: string[]
  ) {
    try {
      const response = await AuthService.registration(
        login,
        name,
        surname,
        email,
        password,
        birthday,
        cell,
        city,
        gender,
        genres,
        instruments
      );
      localStorage.setItem("token", response.data.token);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      throw error;
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  }

  async checkAuth() {
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const response = await $api.get(`${API_URL}/auth`, {
        withCredentials: true,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  }

  async changeAvatar(filedata: File) {
    try {
      UserService.changeAvatar(filedata);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  }
}
