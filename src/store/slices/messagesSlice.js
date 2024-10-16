import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllMessagesRequest(state, action) {
      state.messages = [];
      state.error = null;
      state.loading = true;
    },
    getAllMessagesSuccess(state, action) {
      state.messages = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllMessagesFailed(state, action) {
      state.messages = state.message;
      state.error = action.payload;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.messages = state.messages;
    },
  },
});

export const getAllMessages = () => async (dispatch) => {
  dispatch(messageSlice.actions.getAllMessagesRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/message/getall",
      { withCredentials: true }
    );
    dispatch(messageSlice.actions.getAllMessagesSuccess(data.messages))
    dispatch(messageSlice.actions.clearAllErrors())
  } catch (error) {
    dispatch(messageSlice.actions.getAllMessagesFailed(error.response.data.message))
  }
};

export default messageSlice.reducer
