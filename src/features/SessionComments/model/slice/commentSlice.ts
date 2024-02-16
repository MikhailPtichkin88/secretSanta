import { createSlice } from '@reduxjs/toolkit'
import { CommentSchema } from '../types/commentSchema'
import { getComments } from '../services/getComments'
import { createComment } from '../services/createComment'
import { updateComment } from '../services/updateComment'

const initialState: CommentSchema = {
  comments: [],
  isLoading: false,
  error: undefined,
}

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // changeTotalParticipants: (state, { payload }: PayloadAction<number>) => {
    //   state.totalParticipants = payload
    // },
  },
  extraReducers: (builder) => {
    builder
      // get comments
      .addCase(getComments.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        state.comments = payload
      })
      .addCase(getComments.rejected, (state, { error }) => {
        state.error = error?.message
        state.isLoading = false
      })
      .addCase(getComments.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })

      // create comment
      .addCase(createComment.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        state.comments = [...state.comments, payload]
      })
      .addCase(createComment.rejected, (state, { error }) => {
        state.error = error?.message
        state.isLoading = false
      })
      .addCase(createComment.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })

      // update comment
      .addCase(updateComment.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        state.comments = state.comments.map((comment) =>
          comment._id === payload._id ? payload : comment
        )
      })
      .addCase(updateComment.rejected, (state, { error }) => {
        state.error = error?.message
        state.isLoading = false
      })
      .addCase(updateComment.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
  },
})

export const { actions: commentActions } = commentSlice
export const { reducer: commentReducer } = commentSlice
