import MovieCard, {getRatingLevel, RatingLevels, getDuration} from "./movie-card";
import card, {MovieCardData} from "../mocks/movie-card";

describe(`MovieCard model`, () => {
  it(`should return MovieCard model`, () => {
    expect(new MovieCard(MovieCardData))
      .toEqual(card);
  });
  it(`should return movie reting level`, () => {
    // eslint-disable-next-line no-unused-vars
    for (const item of Object.entries(RatingLevels)) {
      const [level, range] = item;
      const [min, max] = range;
      for (let score = min; score < max; score++) {
        expect(getRatingLevel(score)).toEqual(level);
      }
    }

    expect(getRatingLevel()).toEqual(`Unknown`);
    expect(getRatingLevel(10000)).toEqual(`Unknown`);
  });
  it(`should convert movie duration`, () => {
    expect(getDuration(0)).toEqual(`0m`);
    expect(getDuration(30)).toEqual(`30m`);
    expect(getDuration(65)).toEqual(`1h 5m`);
    expect(getDuration(125)).toEqual(`2h 5m`);
    expect(getDuration(133)).toEqual(`2h 13m`);
  });
});
