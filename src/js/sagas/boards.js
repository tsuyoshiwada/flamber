import _ from "lodash";
import deepEqual from "deep-equal";
import { takeEvery } from "redux-saga";
import { fork, take, put, call, select } from "redux-saga/effects";
import { getBoardById } from "../selectors/boards";
import {
  fetchBoards,
  addBoard,
  updateBoard,
  deleteBoard
} from "../api/boards";
import * as Boards from "../actions/boards";
import * as Items from "../actions/items";

export function *handleFetchBoardsRequest() {
  while (true) {
    yield take(Boards.FETCH_BOARDS_REQUEST);

    try {
      const boards = yield call(fetchBoards);
      yield put(Boards.fetchBoardsSuccess(boards));
    } catch (err) {
      yield put(Boards.fetchBoardsFailure(err));
    }
  }
}

export function *handleAddBoardRequest() {
  while (true) {
    const action = yield take(Boards.ADD_BOARD_REQUEST);

    try {
      const board = yield call(addBoard, action.payload);
      yield put(Boards.addBoardSuccess(board));
    } catch (err) {
      yield put(Boards.addBoardFailure(err));
    }
  }
}

export function *handleUpdateBoardRequest(action) {
  try {
    const prevBoard = yield select(getBoardById, action.payload._id);

    if (deepEqual(prevBoard, action.payload)) {
      yield put(Boards.updateBoardSuccess(prevBoard));

    } else {
      const nextBoard = action.payload;
      nextBoard.modified = new Date().toString();

      const board = yield call(updateBoard, nextBoard);
      yield put(Boards.updateBoardSuccess(board));
    }
  } catch (err) {
    yield put(Boards.updateBoardFailure(err));
  }
}

export function *watchUpdateBoardRequest() {
  yield *takeEvery(Boards.UPDATE_BOARD_REQUEST, handleUpdateBoardRequest);
}

export function *handleDeleteBoardRequest() {
  while (true) {
    const action = yield take(Boards.DELETE_BOARD_REQUEST);

    try {
      yield call(deleteBoard, action.payload);
      yield put(Boards.deleteBoardSuccess(action.payload));
    } catch (err) {
      yield put(Boards.deleteBoardFailure(err));
    }
  }
}

export function *handleAddItemSuccess() {
  while (true) {
    const action = yield take(Items.ADD_ITEM_SUCCESS);
    const board = yield select(getBoardById, action.payload.boardId);
    board.itemCount++;

    yield put(Boards.updateBoardRequest(board));
  }
}

export function *handleDeleteItemSuccess() {
  while (true) {
    const action = yield take(Items.DELETE_ITEM_SUCCESS);
    const board = yield select(getBoardById, action.payload.boardId);
    board.itemCount--;

    yield put(Boards.updateBoardRequest(board));
  }
}

export function *handleMoveItemBoardSuccess() {
  while (true) {
    const action = yield take(Items.MOVE_ITEM_BOARD_SUCCESS);
    const prevBoard = yield select(getBoardById, action.payload.prevBoardId);
    const nextBoard = yield select(getBoardById, action.payload.item.boardId);

    prevBoard.itemCount--;
    nextBoard.itemCount++;

    yield put(Boards.updateBoardRequest(prevBoard));
    yield put(Boards.updateBoardRequest(nextBoard));
  }
}

export function *handleSelectedItemsMoveSuccess() {
  while (true) {
    const action = yield take(Items.SELECTED_ITEMS_MOVE_SUCCESS);
    const { items, prevItems } = action.payload;
    const prevBoards = yield prevItems.map(o => select(getBoardById, o.boardId));
    const nextBoards = yield items.map(o => select(getBoardById, o.boardId));
    const uniqPrevBoards = _.uniq(prevBoards, "_id").map(o => ({ ...o, itemCount: o.itemCount - prevItems.length }));
    const uniqNextBoards = _.uniq(nextBoards, "_id").map(o => ({ ...o, itemCount: o.itemCount + items.length }));

    yield uniqPrevBoards.map(o => put(Boards.updateBoardRequest(o)));
    yield uniqNextBoards.map(o => put(Boards.updateBoardRequest(o)));
  }
}

export default function *rootSaga() {
  yield [
    fork(handleFetchBoardsRequest),
    fork(handleAddBoardRequest),
    fork(watchUpdateBoardRequest),
    fork(handleDeleteBoardRequest),
    fork(handleAddItemSuccess),
    fork(handleDeleteItemSuccess),
    fork(handleMoveItemBoardSuccess),
    fork(handleSelectedItemsMoveSuccess)
  ];
}
