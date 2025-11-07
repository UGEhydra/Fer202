// ✅ Trạng thái ban đầu
const initialMovieState = {
  movies: [],
  loading: false,
  error: "",
  showDeleteModal: false,
  movieToDelete: null,
  searchTerm: "",
};

// ✅ Hàm reducer chính
export default function movieReducer(state, action) {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, loading: true };

    case "SET_MOVIES":
      return { ...state, loading: false, movies: action.payload };

    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "OPEN_DELETE_MODAL":
      return { ...state, showDeleteModal: true, movieToDelete: action.payload };

    case "CLOSE_DELETE_MODAL":
      return { ...state, showDeleteModal: false, movieToDelete: null };

    case "RESET_FORM":
      return { ...state, currentMovie: null, isEditing: null };

    default:
      return state;
  }
}

// ✅ Export thêm cho useReducer sử dụng
export { initialMovieState };
