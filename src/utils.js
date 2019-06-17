
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

/**
 * Сгруппировать массив элементов по заданному полю
 * @param {Object[]} items Массив элементов
 * @param {string} name Массив элементов
 * @return {Object}
 */
export function groupItemsBy(items, name) {
  return items.reduce((out, it) => {
    out[it[name]] = out[it[name]] || [];
    out[it[name]].push(it);

    return out;
  }, {});
}
