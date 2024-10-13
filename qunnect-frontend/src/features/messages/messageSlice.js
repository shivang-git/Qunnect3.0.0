import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { messageAPI } from "./messageAPI";

const initialState = {
  Contacts: [],
  Conversations: [],
  Chats: {}, // Store messages per conversation
  isError: false,
  isLoggedIn: false,
  isRegistered: false,
  isSuccess: false,
  isLoading: false,
};

// Thunk to fetch messages for a specific conversation
export const getMessages = createAsyncThunk(
  "chats/get-messages",
  async (conversationId, { rejectWithValue }) => {
    try {
      const response = await messageAPI.getConversationMessages(conversationId);
      // Ensure the response contains both the conversationId and messages
      return response; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Other thunks (searchContact, getConversations, createConversation)
export const searchContact = createAsyncThunk(
  "user/search-contact",
  async (query, { rejectWithValue }) => {
    try {
      const response = await messageAPI.searchContact(query);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getConversations = createAsyncThunk(
  "chats/get-conversation",
  async (_, { rejectWithValue }) => {
    try {
      const response = await messageAPI.getConversations();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createConversation = createAsyncThunk(
  "chats/create-conversation",
  async (ConvoData, { rejectWithValue }) => {
    try {
      const response = await messageAPI.createConversation(ConvoData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.Contacts = [];
    },
    updateMessages: (state, action) => {
      const { conversationId, messages } = action.payload;

      // Ensure the Messages object for this conversation exists
      if (!state.Chats[conversationId]) {
        state.Chats[conversationId] = []; // Initialize if undefined
      }

      // Add new messages to existing ones
      state.Chats[conversationId].push(...messages); 
    },
    addMessage: (state, action) => {
      const { conversationId, message } = action.payload;

      // Ensure the Messages object for this conversation exists
      if (!state.Chats[conversationId]) {
        state.Chats[conversationId] = []; // Initialize if undefined
      }

      // Add new message to conversation
      state.Chats[conversationId].push(message); 
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling searchContact
      .addCase(searchContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.Contacts = action.payload;
      })
      .addCase(searchContact.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      // Handling getConversations
      .addCase(getConversations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.Conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      // Handling createConversation
      .addCase(createConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const conversation = action.payload;
        state.Conversations.push(conversation); // Add new conversation
      })
      .addCase(createConversation.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      // Handling getMessages for a specific conversation
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const { conversationId, messages } = action.payload;

        
        // Ensure the Chats object exists before accessing conversationId
        if (!state.Chats) {
          state.Chats = {}; // Initialize Chats if it's undefined
        }
    
        // Ensure the Messages array for this conversation exists
        if (!state.Chats[conversationId]) {
          state.Chats[conversationId] = []; // Initialize if undefined
        }
    
        // Add or replace the messages for the conversation
        state.Chats[conversationId] = messages;
      })
      .addCase(getMessages.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { clearSearchResults, updateMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
