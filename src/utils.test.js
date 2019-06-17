import {normalizeItems, groupItemsBy} from "./utils";

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

it(`should return grouped items object`, () => {
  const items = [
    {id: `0`, genre: `1`},
    {id: `1`, genre: `2`},
    {id: `2`, genre: `3`},
    {id: `3`, genre: `2`},
    {id: `4`, genre: `4`},
    {id: `5`, genre: `1`},
    {id: `6`, genre: `5`},
  ];
  const groups = groupItemsBy(items, `genre`);

  expect(groups).toEqual({
    1: [items[0], items[5]],
    2: [items[1], items[3]],
    3: [items[2]],
    4: [items[4]],
    5: [items[6]],
  });
});
