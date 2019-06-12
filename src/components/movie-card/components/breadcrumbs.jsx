import React from "react";
import Nav from "../../breadcrumbs/breadcrumbs";
import {MovieCardPropTypes} from "../../../prop-types";

function Breadcrumbs({card = {}}) {
  const {id, title} = card;
  return (
    <Nav>
      <Nav.Item
        label={title}
        href={`/film/${id}`}/>
      <Nav.Item
        label="Add review"
        href={`/film/${id}/review`}/>
    </Nav>
  );
}

Breadcrumbs.propTypes = {
  /** Карточка фильма */
  card: MovieCardPropTypes,
};

export default Breadcrumbs;
