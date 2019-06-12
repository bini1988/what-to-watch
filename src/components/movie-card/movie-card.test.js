import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card";
import card from "../../mocks/movie-card";

it(`MovieCard correctly renders default markup`, () => {
  const tree = renderer.create(
      <MovieCard card={card}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`MovieCard correctly renders complex markup`, () => {
  const tree = renderer.create(
      <MemoryRouter
        initialEntries = {[`/`]}>
        <MovieCard full card={card}>
          <MovieCard.Wrapper main>
            <MovieCard.Header/>
            <MovieCard.Wrapper>
              <MovieCard.Description>
                <MovieCard.PlayButton/>
                <MovieCard.ListButton/>
                <MovieCard.ReviewButton/>
              </MovieCard.Description>
            </MovieCard.Wrapper>
          </MovieCard.Wrapper>
          <MovieCard.InfoWrapper translate>
            <MovieCard.Poster mode="big"/>
            <MovieCard.About/>
          </MovieCard.InfoWrapper>
        </MovieCard>
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
