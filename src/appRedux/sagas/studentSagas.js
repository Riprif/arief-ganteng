// src/appRedux/sagas/studentSagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    FETCH_STUDENTS_REQUEST,
    FETCH_STUDENTS_SUCCESS,
    FETCH_STUDENTS_FAILURE,
    ADD_STUDENT_REQUEST,
    ADD_STUDENT_SUCCESS,
    ADD_STUDENT_FAILURE,
    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAILURE,
    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_SUCCESS,
    DELETE_STUDENT_FAILURE,
} from '../actions/studentActions';

const API_URL = 'https://crudcrud.com/api/ddf86771528040e3b128cec0eb049a14/students';

function* fetchStudents() {
    try {
        const response = yield call(axios.get, API_URL);
        yield put({ type: FETCH_STUDENTS_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: FETCH_STUDENTS_FAILURE, payload: error.message });
    }
}

function* addStudent(action) {
    try {
        const response = yield call(axios.post, API_URL, action.payload);
        yield put({ type: ADD_STUDENT_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: ADD_STUDENT_FAILURE, payload: error.message });
    }
}

function* updateStudent(action) {
    try {
        const { _id, ...data } = action.payload;
        const response = yield call(axios.put, `${API_URL}/${_id}`, data);
        yield put({ type: UPDATE_STUDENT_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: UPDATE_STUDENT_FAILURE, payload: error.message });
    }
}

function* deleteStudent(action) {
    try {
        yield call(axios.delete, `${API_URL}/${action.payload}`);
        yield put({ type: DELETE_STUDENT_SUCCESS, payload: action.payload });
    } catch (error) {
        yield put({ type: DELETE_STUDENT_FAILURE, payload: error.message });
    }
}

export default function* studentSagas() {
    yield takeLatest(FETCH_STUDENTS_REQUEST, fetchStudents);
    yield takeLatest(ADD_STUDENT_REQUEST, addStudent);
    yield takeLatest(UPDATE_STUDENT_REQUEST, updateStudent);
    yield takeLatest(DELETE_STUDENT_REQUEST, deleteStudent);
}
