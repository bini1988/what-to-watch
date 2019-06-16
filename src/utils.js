
/**
 * Норамализовать массив фильмов
 * @param {Object[]} items Массив объектов
 * @return {Object}
 */
export function normalizeItems(items = []) {
  return items.reduce((out, it) => {
    out.items[it.id] = it;
    out.itemsIds.push(it.id);
    return out;
  }, {items: {}, itemsIds: []});
}
