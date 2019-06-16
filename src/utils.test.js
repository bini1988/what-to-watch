import {normalizeItems} from "./utils";

it(`should return normalized objest`, () => {
  const arr = Array.from({length: 10});
  const items = arr.map((it, id) => ({id}));

  expect(normalizeItems(items)).toEqual({
    items: items.reduce((out, it) => {
      out[it.id] = it;
      return out;
    }, {}),
    itemsIds: arr.map((it, index) => index)
  });
});
