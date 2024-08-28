import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postAPI } from "./postAPI";

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(likePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const { postId, userId } = action.payload;
        const post = state.posts.find((post) => post._id === postId);
      
        if (post.likes.includes(userId)) {
          post.likes = post.likes.filter((id) => id !== userId);
          post.likesCount=post.likes.length
        } else {
          post.likes.push(userId);
          post.likesCount=post.likes.length
        }
      })
      .addCase(likePost.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(commentPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;  
        const { postId, comment } = action.payload;
        
        const post = state.posts.find((post) => post._id === postId);
        if (post) {
          post.comments.unshift(comment);
          post.commentsCount=post.comments.length
        }
      })
      .addCase(commentPost.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getcommentPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getcommentPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;  
        const { postId, comments } = action.payload;       
        const post = state.posts.find((post) => post._id === postId);
        if (post) {
          comments.forEach(comment => {
            post.comments.push(comment);
          });
        }
      })
      .addCase(getcommentPost.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const createPost = createAsyncThunk(
  "posts/create-post",
  async (postData, thunkAPI) => {
    try {
        return await postAPI.createPost(postData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const getPosts = createAsyncThunk(
    "posts/get-posts",
    async (thunkAPI) => {
        try {
            const response=await postAPI.getPosts();
            return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/like",
  async (postId, thunkAPI) => {
    try {
      const response = await postAPI.likePost(postId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const commentPost = createAsyncThunk(
  "posts/comment",
  async ({ postId, postData }, thunkAPI) => {
    try {
      return await postAPI.commentPost(postId, postData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getcommentPost = createAsyncThunk(
  "posts/get-comments",
  async ({postId,lastCommentId }, thunkAPI) => {
    try {     
      const response = await postAPI.getcommentPost(postId,lastCommentId );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export default postSlice.reducer;
