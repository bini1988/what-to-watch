import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withMovieCard, {MovieCardContext} from "./with-movie-card";

configure({adapter: new Adapter()});

function MockComponent() {
  return <div />;
}

describe(`withMovieCard`, () => {
  it(`should render wrapped component`, () => {
    const value = {card: {id: `id#0`}};
    const props = {a: `1`, b: `2`};
    const WrappedMockComponent = withMovieCard(MockComponent);
    const wrapper = mount(
        <MovieCardContext.Provider value={value}>
          <WrappedMockComponent {...props}/>
        </MovieCardContext.Provider>
    );

    expect(wrapper.find(MockComponent)).toHaveLength(1);
    expect(wrapper.find(MockComponent).props()).toEqual({...props, ...value});
  });
});
