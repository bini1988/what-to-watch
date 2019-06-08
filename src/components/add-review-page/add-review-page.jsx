import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getUserProfile} from "../../reducer/user/selectors";

import MovieCard from "../movie-card/movie-card";
import PageHeader from "../page-header/page-header";
import PageTitle from "../page-title/page-title";
import UserBlock from "../user-block/user-block";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import AddReview from "../add-review/add-review";

import card from "../../mocks/movie-card";

function AddReviewPage({user, onSubmit}) {
  return (
    <MovieCard
      mode="full"
      card={card}
      renderHeader={() => (
        <PageHeader>
          <Breadcrumbs>
            <Breadcrumbs.Item
              label="The Grand Budapest Hotel"
              href="/film/:id"/>
            <Breadcrumbs.Item
              label="Add review"/>
          </Breadcrumbs>
          <PageTitle hidden={true}>
            {`WTW`}
          </PageTitle>
          <UserBlock user={user}/>
        </PageHeader>
      )}>
      <AddReview
        onSubmit={onSubmit}/>
    </MovieCard>
  );
}

AddReviewPage.propTypes = {
  /** Данные пользователя */
  user: UserBlock.propTypes.user,
  /** Обработчик события отправки формы */
  onSubmit: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    user: getUserProfile(state),
  };
};


export {AddReviewPage};
export default connect(mapStateToProps)(AddReviewPage);

