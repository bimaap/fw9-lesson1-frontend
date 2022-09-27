import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getData = createAsyncThunk("contactUs/getData", async () => {
  const result = {};
  try {
    const { data } = await axios.get("http://localhost:8080/contact/");
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

    const { data } = await axios.post("http://localhost:8080/contact/", send);
    return data;
  } catch (e) {
    result.errorMsg = e.response.data.message;
    return result;
  }
});