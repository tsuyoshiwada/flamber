// @flow
import { find } from "lodash";
import { getItemEntityById } from "./items";

import type { ConnectState } from "../types/redux";
import type { TagId, TagEntity, TagEntities } from "../types/tag";
import type { ItemId, ItemEntity } from "../types/item";


export const getTagEntityById = (state: ConnectState, id: TagId): ?TagEntity =>
  state.entities.tags[id];

export const getTagEntityByName = (state: ConnectState, name: string): ?TagEntity =>
  find(state.entities.tags, (o: TagEntity): boolean => o.name === name);

export const getTagEntities = (state: ConnectState): TagEntities =>
  state.tags.results.map((id: TagId): TagEntity => state.entities.tags[id]);

export const getTagEntitiesByItemId = (state: ConnectState, itemId: ItemId): TagEntities => {
  const item: ?ItemEntity = getItemEntityById(state, itemId);
  return !item ? [] : item.Tags.map((id: TagId): TagEntity => state.entities.tags[id]);
};

export const getCurrentTag = (state: ConnectState): ?TagEntity =>
  state.tags.currentTag == null ? null : state.entities.tags[state.tags.currentTag];
