import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const filmsMock = [
  {
    id: `480d2236-6c7d-4fd3-a225-80c66710a71f`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  }, {
    id: `505f451a-0b69-47ed-96c6-66d5525d5a5e`,
    title: `Bohemian Rhapsody`,
    img: `img/bohemian-rhapsody.jpg`,
  }
];

it(`App correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <App films={filmsMock}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
