import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAuthors } from '../api/AuthorsApi'; // Correct path to your API file

// Async thunk for fetching authors
export const fetchAuthorsThunk = createAsyncThunk('authors/fetchAuthors', fetchAuthors);

const fontaneliSlice = createSlice({
  name: 'authors',
  initialState: {
    authors: [],
    selectedAuthors: [],
    randomQuotes: [],
    loading: false,
    error: null,
    chosenAuthor: 'Nikola Tesla',
    selectedTopic: 'Innovation',
  },
  reducers: {
    setSelectedAuthors(state, action) {
      state.selectedAuthors = action.payload;
    },
    setRandomQuotes(state, action) {
      state.randomQuotes = action.payload;
    },
    setChosenAuthor(state, action) {
      state.chosenAuthor = action.payload;
    },
    setSelectedTopic(state, action) {
      state.selectedTopic = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthorsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthorsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.authors = action.payload; // Set authors data
      })
      .addCase(fetchAuthorsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture error
      });
  },
});

// Export actions and reducer
export const { setSelectedAuthors, setRandomQuotes, setChosenAuthor, setSelectedTopic } = fontaneliSlice.actions;

export default fontaneliSlice.reducer;