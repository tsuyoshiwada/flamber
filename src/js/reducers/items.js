// @flow
import { handleActions } from "redux-actions";
import * as ItemVisibilityFilters from "../constants/item-visibility-filters";
import * as I from "../actions/items";

import type {
  ItemState,

  SetCurrentItemAction,
  SetItemCurrentColors,
  SetItemVisibilityFilterAction,
  SetItemImageEditingAction,
  FetchItemsFailureAction,
  AddItemURLFailureAction,
  AddItemFileFailureAction,
  MoveItemSelectBoardOpenAction,
  MoveItemFailureAction,
  SelectedItemsMoveFailureAction
} from "../types/item";


const initialState: ItemState = {
  isFetching: false,
  isAdding: false,
  isMoving: false,
  isImageEditing: false,
  isScreenshotTaking: false,
  error: null,
  currentItem: null,
  currentColors: [],
  visibilityFilter: ItemVisibilityFilters.ALL,
  addFileDialogOpen: false,
  addURLDialogOpen: false,
  addSnackbarOpen: false,
  moveItems: [],
  selectBoardDialogOpen: false,
  detailDrawerOpen: false
};

export default handleActions({
  // Set current item
  [I.SET_CURRENT_ITEM]: (state: ItemState, action: SetCurrentItemAction): ItemState => ({
    ...state,
    currentItem: action.payload,
    detailDrawerOpen: true
  }),


  // Set currentColors
  [I.SET_ITEM_CURRENT_COLORS]: (state: ItemState, action: SetItemCurrentColors): ItemState => ({
    ...state,
    currentColors: action.payload
  }),


  // Set visibility filter
  [I.SET_ITEM_VISIBILITY_FILTER]: (state: ItemState, action: SetItemVisibilityFilterAction): ItemState => ({
    ...state,
    visibilityFilter: action.payload
  }),


  // Image editing
  [I.SET_ITEM_IMAGE_EDITING]: (state: ItemState, action: SetItemImageEditingAction): ItemState => ({
    ...state,
    isImageEditing: action.payload,
    detailDrawerOpen: !action.payload
  }),


  // Detail drawer
  [I.ITEM_DETAIL_DRAWER_TOGGLE]: (state: ItemState): ItemState => ({
    ...state,
    detailDrawerOpen: !state.detailDrawerOpen
  }),

  [I.ITEM_DETAIL_DRAWER_OPEN]: (state: ItemState): ItemState => ({
    ...state,
    detailDrawerOpen: true
  }),

  [I.ITEM_DETAIL_DRAWER_CLOSE]: (state: ItemState): ItemState => ({
    ...state,
    detailDrawerOpen: false
  }),


  // Fetch
  [I.FETCH_ITEMS_REQUEST]: (state: ItemState): ItemState => ({
    ...state,
    isFetching: true
  }),

  [I.FETCH_ITEMS_SUCCESS]: (state: ItemState): ItemState => ({
    ...state,
    isFetching: false
  }),

  [I.FETCH_ITEMS_FAILURE]: (state: ItemState, action: FetchItemsFailureAction): ItemState => ({
    ...state,
    isFetching: false,
    error: action.payload
  }),


  // Add from URL (UI)
  [I.ADD_ITEM_URL_DIALOG_OPEN]: (state: ItemState): ItemState => ({
    ...state,
    addURLDialogOpen: true,
    addSnackbarOpen: false
  }),

  [I.ADD_ITEM_URL_DIALOG_CLOSE]: (state: ItemState): ItemState => ({
    ...state,
    addURLDialogOpen: false
  }),


  // Taking screenshot
  [I.TAKE_SCREENSHOT_START]: (state: ItemState): ItemState => ({
    ...state,
    isScreenshotTaking: true
  }),

  [I.TAKE_SCREENSHOT_END]: (state: ItemState): ItemState => ({
    ...state,
    isScreenshotTaking: false
  }),


  // Add from File (UI)
  [I.ADD_ITEM_FILE_DIALOG_OPEN]: (state: ItemState): ItemState => ({
    ...state,
    addFileDialogOpen: true,
    addSnackbarOpen: false
  }),

  [I.ADD_ITEM_FILE_DIALOG_CLOSE]: (state: ItemState): ItemState => ({
    ...state,
    addFileDialogOpen: false
  }),


  // Add from URL
  [I.ADD_ITEM_URL_REQUEST]: (state: ItemState): ItemState => ({
    ...state,
    isAdding: true
  }),

  [I.ADD_ITEM_URL_SUCCESS]: (state: ItemState): ItemState => ({
    ...state,
    isAdding: false,
    error: null,
    addURLDialogOpen: false,
    addSnackbarOpen: true
  }),

  [I.ADD_ITEM_URL_FAILURE]: (state, action: AddItemURLFailureAction): ItemState => ({
    ...state,
    isAdding: false,
    error: action.payload,
    addURLDialogOpen: false,
    addSnackbarOpen: true
  }),


  // Add from file
  [I.ADD_ITEM_FILE_REQUEST]: (state: ItemState): ItemState => ({
    ...state,
    isAdding: true
  }),

  [I.ADD_ITEM_FILE_SUCCESS]: (state: ItemState): ItemState => ({
    ...state,
    isAdding: false,
    error: null,
    addFileDialogOpen: false,
    addSnackbarOpen: true
  }),

  [I.ADD_ITEM_FILE_FAILURE]: (state: ItemState, action: AddItemFileFailureAction): ItemState => ({
    ...state,
    isAdding: false,
    error: action.payload,
    addFileDialogOpen: false,
    addSnackbarOpen: true
  }),


  // Delete
  [I.DELETE_ITEM_REQUEST]: (state: ItemState): ItemState => ({
    ...state,
    currentItem: null
  }),


  // Move
  [I.MOVE_ITEM_SELECT_BOARD_OPEN]: (state: ItemState, action: MoveItemSelectBoardOpenAction): ItemState => ({
    ...state,
    moveItems: [action.payload],
    selectBoardDialogOpen: true
  }),

  [I.MOVE_ITEM_SELECT_BOARD_CLOSE]: (state: ItemState): ItemState => ({
    ...state,
    moveItems: [],
    selectBoardDialogOpen: false
  }),

  [I.MOVE_ITEM_REQUEST]: (state: ItemState): ItemState => ({
    ...state,
    isMoving: true
  }),

  [I.MOVE_ITEM_SUCCESS]: (state: ItemState): ItemState => ({
    ...state,
    isMoving: false,
    selectBoardDialogOpen: false
  }),

  [I.MOVE_ITEM_FAILURE]: (state: ItemState, action: MoveItemFailureAction): ItemState => ({
    ...state,
    isMoving: false,
    selectBoardDialogOpen: false,
    error: action.payload
  }),


  // Selected move
  [I.SELECTED_ITEMS_MOVE_OPEN]: (state: ItemState): ItemState => ({
    ...state,
    selectBoardDialogOpen: true
  }),

  [I.SELECTED_ITEMS_MOVE_CLOSE]: (state: ItemState): ItemState => ({
    ...state,
    selectBoardDialogOpen: false
  }),

  [I.SELECTED_ITEMS_MOVE_REQUEST]: (state: ItemState): ItemState => ({
    ...state,
    isMoving: true
  }),

  [I.SELECTED_ITEMS_MOVE_SUCCESS]: (state: ItemState): ItemState => ({
    ...state,
    isMoving: false,
    error: null,
    selectBoardDialogOpen: false
  }),

  [I.SELECTED_ITEMS_MOVE_FAILURE]: (state: ItemState, action: SelectedItemsMoveFailureAction): ItemState => ({
    ...state,
    isMoving: false,
    error: action.payload,
    selectBoardDialogOpen: false
  })
}, initialState);
