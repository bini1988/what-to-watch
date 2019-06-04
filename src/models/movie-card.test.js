import MovieCard from "./movie-card";

describe(`MovieCard model`, () => {
  it(`should return MovieCard model`, () => {
    const data = {
      "name": `War of the Worlds`,
      "poster_image": `https://es31-server.appspot.com/wtw/static/film/poster/War_of_the_Worlds.jpg`,
      "preview_image": `https://es31-server.appspot.com/wtw/static/film/preview/war-of-the-worlds.jpg`,
      "background_image": `https://es31-server.appspot.com/wtw/static/film/background/War_of_the_Worlds.jpg`,
      "background_color": `#9B7E61`,
      "description": `As Earth is invaded by alien tripod fighting machines, one family fights for survival.`,
      "rating": 6.5,
      "scores_count": 386834,
      "director": `Steven Spielberg`,
      "starring": [
        `Tom Cruise`,
        `Dakota Fanning`,
        `Tim Robbin`
      ],
      "run_time": 116,
      "genre": `Adventure`,
      "released": 2005,
      "id": 1,
      "is_favorite": false,
      "video_link": `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
      "preview_video_link": `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp`,
    };

    expect(new MovieCard(data))
      .toEqual({
        id: 1,
        title: `War of the Worlds`,
        genre: `Adventure`,
        year: 2005,
        images: {
          preview: `https://es31-server.appspot.com/wtw/static/film/preview/war-of-the-worlds.jpg`,
          poster: `https://es31-server.appspot.com/wtw/static/film/poster/War_of_the_Worlds.jpg`,
          background: `https://es31-server.appspot.com/wtw/static/film/background/War_of_the_Worlds.jpg`
        },
        trailer: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`
      });
  });
});
