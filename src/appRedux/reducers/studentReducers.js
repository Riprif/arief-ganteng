// src/appRedux/reducers/studentReducer.js
import {
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAILURE,
  UPDATE_STUDENT_SUCCESS,
  UPDATE_STUDENT_FAILURE,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAILURE,
} from '../actions/studentActions';

const initialState = {
  students: [],
  error: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload,
        error: null,
      };
    case FETCH_STUDENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_STUDENT_SUCCESS:
      return {
        ...state,
        students: [...state.students, action.payload],
        error: null,
      };
    case ADD_STUDENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.map((student) =>
          student._id === action.payload._id ? action.payload : student
        ),
        error: null,
      };
    case UPDATE_STUDENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.filter((student) => student._id !== action.payload),
        error: null,
      };
    case DELETE_STUDENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default studentReducer;
