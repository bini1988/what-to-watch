import {breakTime, formatPlayerTime} from "./player-utils";


describe(`VideoPlayer utils`, () => {
  it(`should break given time in parts`, () => {
    const tests = [
      [37, 35, 30],
      [51, 24, 28],
      [27, 40, 48],
      [54, 6, 8],
      [5, 2, 42],
      [11, 8, 6],
      [36, 58, 7],
      [3, 20, 20],
      [57, 41, 17],
      [1, 58, 38],
      [6, 57, 17],
      [41, 44, 4],
      [9, 26, 29],
      [25, 54, 52],
      [27, 59, 33],
      [38, 23, 52],
    ];

    expect(breakTime()).toEqual([0, 0, 0]);

    const SECONDS_PER_HOUR = 3600;
    const SECONDS_PER_MINUTE = 60;

    for (const test of tests) {
      const [hours, minutes, seconds] = test;
      const time =
        SECONDS_PER_HOUR * hours +
        SECONDS_PER_MINUTE * minutes +
        seconds;

      expect(breakTime(time)).toEqual(test);
    }
  });
  it(`should format given player time`, () => {
    expect(formatPlayerTime(0, 30)).toEqual(`0`);
    expect(formatPlayerTime(5, 30)).toEqual(`5`);
    expect(formatPlayerTime(15, 30)).toEqual(`15`);
    expect(formatPlayerTime(30, 30)).toEqual(`30`);

    expect(formatPlayerTime(0, 80)).toEqual(`0:00`);
    expect(formatPlayerTime(5, 80)).toEqual(`0:05`);
    expect(formatPlayerTime(15, 80)).toEqual(`0:15`);
    expect(formatPlayerTime(75, 80)).toEqual(`1:15`);

    expect(formatPlayerTime(0, 37000)).toEqual(`0:00:00`);
    expect(formatPlayerTime(305, 37000)).toEqual(`0:05:05`);
    expect(formatPlayerTime(315, 37000)).toEqual(`0:05:15`);
    expect(formatPlayerTime(915, 37000)).toEqual(`0:15:15`);
    expect(formatPlayerTime(4515, 37000)).toEqual(`1:15:15`);
    expect(formatPlayerTime(36915, 37000)).toEqual(`10:15:15`);
  });
});
