import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getData = createAsyncThunk("contactUs/getData", async (query) => {
  const result = {};
  const page = query.page || 1
  const search = query.search || ''
  const limit = query.limit || 8

  try {
    const { data } = await axios.get(`https://lesson-backend.vercel.app/contact/?page=${page}&search=${search}&limit=${limit}`);
    return data;
  } catch (e) {
    result.errorMsg = e.response.data.message;
    return result;
  }
});

export const getDataById = createAsyncThunk("contactUs/getDataById", async (query) => {
  const result = {};
  try {
    const { data } = await axios.get(`https://lesson-backend.vercel.app/contact/${query.id}`);
    return data;
  } catch (e) {
    result.errorMsg = e.response.data.message;
    return result;
  }
});

export const createData = createAsyncThunk("contactUs/createData", async (request) => {
  const result = {};
  try {
    const send = new URLSearchParams();
    send.append('first_name', request.firstName);
    send.append('last_name', request.lastName);
    send.append('email', request.email);
    send.append('phone', request.phone);
    send.append('needed', request.needed);
    send.append('message', request.message);

    const { data } = await axios.post("https://lesson-backend.vercel.app/contact/", send);
    return data;
  } catch (e) {
    result.errorMsg = e.response.data.message;
    return result;
  }
});

export const updateData = createAsyncThunk("contactUs/updateData", async (request) => {
  const result = {};
  try {
    const send = new URLSearchParams();
    send.append('first_name', request.firstName);
    send.append('last_name', request.lastName);
    send.append('email', request.email);
    send.append('phone', request.phone);
    send.append('needed', request.needed);
    send.append('message', request.message);

    const { data } = await axios.patch(`https://lesson-backend.vercel.app/contact/${request.id}`, send);
    return data;
  } catch (e) {
    result.errorMsg = e.response.data.message;
    return result;
  }
});

export const deleteData = createAsyncThunk("contactUs/deleteData", async (request) => {
  const result = {};
  try {
    const { data } = await axios.delete(`https://lesson-backend.vercel.app/contact/${request.id}`);
    return data;
  } catch (e) {
    result.errorMsg = e.response.data.message;
    return result;
  }
});