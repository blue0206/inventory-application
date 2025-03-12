import { useSelector, useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "./store";
import { CustomDefinedErrorType } from "../utils/custom-error";

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: CustomDefinedErrorType;
}>();