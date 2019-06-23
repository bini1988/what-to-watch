
/**
 * Норамализовать массив элементов
 * @param {Object[]} items Массив элементов
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
 * @param {string} name Имя поля группировки
 * @param {function} selector Селектор сохраняемых элементов
 * @return {Object}
 */
export function groupItemsBy(items, name, selector = (it) => it) {
  return items.reduce((out, it) => {
    out[it[name]] = out[it[name]] || [];
    out[it[name]].push(selector(it));

    return out;
  }, {});
}
