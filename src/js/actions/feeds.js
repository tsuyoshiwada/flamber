// @flow
import type {
  AddFeedSuccessPayload,
  AddFeedRequestAction,
  AddFeedSuccessAction,
  AddFeedFailureAction
} from "../types/feed";


// Add
export const ADD_FEED_REQUEST = "ADD_FEED_REQUEST";
export const ADD_FEED_SUCCESS = "ADD_FEED_SUCCESS";
export const ADD_FEED_FAILURE = "ADD_FEED_FAILURE";

export function addFeedRequest(url: string): AddFeedRequestAction {
  return { type: ADD_FEED_REQUEST, payload: url };
}

export function addFeedSuccess(payload: AddFeedSuccessPayload): AddFeedSuccessAction {
  return { type: ADD_FEED_SUCCESS, payload };
}

export function addFeedFailure(error: Error): AddFeedFailureAction {
  return { type: ADD_FEED_FAILURE, payload: error, error: true };
}
