import { createSelector } from "@ngrx/store";
import { User } from "src/app/types/user";
import { AppState } from ".";

export const selectFeature = (state: AppState) => state.user;

export const userSelector = createSelector(
    selectFeature,
    (state: User) => state
);
export const userIdSelector = createSelector(
    selectFeature,
    (state: User) => state.id
);
