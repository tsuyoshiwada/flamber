import _ from "lodash";
import { handleActions } from "redux-actions";
import * as Boards from "../../actions/boards";
import * as Items from "../../actions/items";

// TODO: Refactor
function mergeEntities(state, entities) {
  return _.assign(state, entities || {});
}

export default handleActions({
  // Fetch
  [Items.FETCH_ITEMS_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.items)
  ),


  // Add from URL
  [Items.ADD_ITEM_URL_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.items)
  ),


  // Add from file
  [Items.ADD_ITEM_FILE_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.items)
  ),


  // Delete
  [Items.DELETE_ITEM_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload ? entity : {
        ...entity,
        isDeleting: true
      }
    )
  ),

  [Items.DELETE_ITEM_SUCCESS]: (state, { payload }) => (
    _.pickBy(state, (entity, id) =>
      id !== payload.id
    )
  ),

  [Items.DELETE_ITEM_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id !== meta.entity.id ? entity : {
        ...entity,
        isDeleting: false
      }
    )
  ),


  // Star
  [Items.STAR_ITEM_TOGGLE_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload ? entity : {
        ...entity,
        star: !entity.star
      }
    )
  ),

  [Items.STAR_ITEM_TOGGLE_SUCCESS]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        star: payload.star
      }
    )
  ),

  [Items.STAR_ITEM_TOGGLE_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id !== meta ? entity : {
        ...entity,
        star: !entity.star
      }
    )
  ),


  // Update name
  [Items.UPDATE_ITEM_NAME_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        name: payload.name,
        isUpdating: true,
        isNameUpdating: true
      }
    )
  ),

  [Items.UPDATE_ITEM_NAME_SUCCESS]: (state, { payload }) => (
    _.mapValues(state, entity =>
      payload.result.items.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        name: payload.entities.items[entity.id].name,
        isUpdating: false,
        isNameUpdating: false
      }
    )
  ),

  [Items.UPDATE_ITEM_NAME_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id !== meta.id ? entity : {
        ...entity,
        isUpdating: false,
        isNameUpdating: false
      }
    )
  ),


  // Update description
  [Items.UPDATE_ITEM_DESCRIPTION_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        description: payload.description,
        isUpdating: true,
        isDescriptionUpdating: true
      }
    )
  ),

  [Items.UPDATE_ITEM_DESCRIPTION_SUCCESS]: (state, { payload }) => (
    _.mapValues(state, entity =>
      payload.result.items.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        description: payload.entities.items[entity.id].description,
        isUpdating: false,
        isDescriptionUpdating: false
      }
    )
  ),

  [Items.UPDATE_ITEM_DESCRIPTION_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id === meta.id ? entity : {
        ...entity,
        isUpdating: false,
        isDescriptionUpdating: false
      }
    )
  ),


  // Update palette
  [Items.UPDATE_ITEM_PALETTE_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        palette: payload.palette,
        isUpdating: true,
        isPaletteUpdating: true
      }
    )
  ),

  [Items.UPDATE_ITEM_PALETTE_SUCCESS]: (state, { payload }) => (
    _.mapValues(state, entity =>
      payload.result.items.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        palette: payload.entities.items[entity.id].palette,
        isUpdating: false,
        isPaletteUpdating: false
      }
    )
  ),

  [Items.UPDATE_ITEM_PALETTE_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id === meta.id ? entity : {
        ...entity,
        isUpdating: false,
        isPaletteUpdating: false
      }
    )
  ),


  // Image
  [Items.UPDATE_ITEM_IMAGE_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        isImageUpdating: true
      }
    )
  ),

  [Items.UPDATE_ITEM_IMAGE_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.items)
  ),

  [Items.UPDATE_ITEM_IMAGE_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id !== meta.id ? entity : {
        ...entity,
        isImageUpdating: false
      }
    )
  ),


  // Add tag
  [Items.ADD_ITEM_TAG_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        tags: [...entity.tags, payload.tagId],
        isUpdating: true,
        isTagAdding: true
      }
    )
  ),

  [Items.ADD_ITEM_TAG_SUCCESS]: (state, { payload }) => (
    _.mapValues(state, entity =>
      payload.result.items.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        isUpdating: false,
        isTagAdding: false
      }
    )
  ),

  [Items.ADD_ITEM_TAG_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id !== meta.id ? entity : {
        ...entity,
        isUpdating: false,
        isTagAdding: false
      }
    )
  ),


  // Remove tag
  [Items.REMOVE_ITEM_TAG_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        tags: entity.tags.filter(tagId => payload.tagId !== tagId),
        isUpdating: true,
        isTagRemoveing: true
      }
    )
  ),

  [Items.REMOVE_ITEM_TAG_SUCCESS]: (state, { payload }) => (
    _.mapValues(state, entity =>
      payload.result.items.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        isUpdating: false,
        isTagRemoveing: false
      }
    )
  ),

  [Items.REMOVE_ITEM_TAG_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id !== meta.id ? entity : {
        ...entity,
        isUpdating: false,
        isTagRemoveing: false
      }
    )
  ),


  // Register tag
  [Items.REGISTER_ITEM_TAG_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        tags: [...entity.tags, payload.tagId],
        isUpdating: true,
        isTagAdding: true
      }
    )
  ),

  [Items.REGISTER_ITEM_TAG_SUCCESS]: (state, { payload, meta }) => (
    _.mapValues(state, entity =>
      entity.id !== meta.id ? entity : {
        ...entity,
        tags: _.union(
          _.without(entity.tags, meta.tagId),
          payload.entities.items[payload.result.items[0]].tags
        ),
        isUpdating: false,
        isTagAdding: false
      }
    )
  ),

  [Items.REGISTER_ITEM_TAG_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id !== meta.id ? entity : {
        ...entity,
        tags: _.without(entity.tags, meta.tagId),
        isUpdating: false,
        isTagAdding: false
      }
    )
  ),


  // Move
  [Items.MOVE_ITEM_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.items)
  ),


  // Select
  [Items.SELECT_ITEM_TOGGLE]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload ? entity : {
        ...entity,
        select: !entity.select
      }
    )
  ),


  // Select all
  [Items.SELECT_ALL_ITEM_EXEC]: (state, { payload }) => (
    _.mapValues(state, entity =>
      !payload.some(o => o.id === entity.id) ? entity : {
        ...entity,
        select: true
      }
    )
  ),


  // Unselect all
  [Items.UNSELECT_ALL_ITEM_EXEC]: (state, { payload }) => (
    _.mapValues(state, entity =>
      !payload.some(o => o.id === entity.id) ? entity : {
        ...entity,
        select: false
      }
    )
  ),


  // Select star item
  [Items.SELECT_STAR_ITEM_EXEC]: (state, { payload }) => (
    _.mapValues(state, entity =>
      !payload.some(o => o.id === entity.id) ? entity : {
        ...entity,
        select: entity.star
      }
    )
  ),


  // Selected delete
  [Items.SELECTED_ITEMS_DELETE_REQUEST]: state => (
    _.mapValues(state, entity =>
      !entity.select ? entity : {
        ...entity,
        isDeleting: true
      }
    )
  ),

  [Items.SELECTED_ITEMS_DELETE_SUCCESS]: (state, { payload }) => (
    _.pickBy(state, (entity, id) =>
      !payload.some(o => o.id === id)
    )
  ),

  [Items.SELECTED_ITEMS_DELETE_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      !meta.entities.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        isDeleting: false
      }
    )
  ),


  // Selected star
  [Items.SELECTED_ITEMS_STAR_REQUEST]: state => (
    _.mapValues(state, entity =>
      !entity.select ? entity : {
        ...entity,
        isUpdating: true
      }
    )
  ),

  [Items.SELECTED_ITEMS_STAR_SUCCESS]: (state, { payload }) => (
    _.mapValues(state, entity =>
      !payload.entities.items.hasOwnProperty(entity.id) ? entity : {
        ...entity,
        select: false,
        isUpdating: false,
        star: payload.entities.items[entity.id].star
      }
    )
  ),

  [Items.SELECTED_ITEMS_STAR_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity => {
      const index = _.findIndex(meta.entities, o => o.id === entity.id);
      return index < 0 ? entity : {
        ...meta.entities[index],
        isUpdating: false
      };
    })
  ),


  // Selected move
  [Items.SELECTED_ITEMS_MOVE_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.board !== payload || !entity.select ? entity : {
        ...entity,
        isMoving: true
      }
    )
  ),

  [Items.SELECTED_ITEMS_MOVE_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.items)
  ),

  [Items.SELECTED_ITEMS_MOVE_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      meta.prevBoards.indexOf(entity.board) < 0 ? entity : {
        ...entity,
        isMoving: false
      }
    )
  ),


  // Boards
  [Boards.FETCH_BOARDS_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.items)
  )
}, {});
