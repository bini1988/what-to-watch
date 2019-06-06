import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {changeMoviesActiveGenre} from "../../reducer/catalog/catalog";
import {getMoviesByGenres, getActiveGenre} from "../../reducer/catalog/selectors";
import {requireAuthorization} from "../../reducer/user/user";
import {getUserProfile} from "../../reducer/user/selectors";

import PageHeader from "../page-header/page-header";
import PageFooter from "../page-footer/page-footer";
import UserBlock from "../user-block/user-block";
import MoviesCatalog from "../movies-catalog/movies-catalog";

function MyListPage(props) {
  const {user, moviesGenreGroups, activeGenre, onGenreChange, onSignIn} = props;

  return (
    <div className="user-page">
      <PageHeader
        className="user-page__head">
        <h1 className="page-title user-page__title">
          {`My list`}
        </h1>
        <UserBlock
          user={user}
          onSignIn={(event) => {
            event.preventDefault();
            onSignIn();
          }}/>
      </PageHeader>
      <MoviesCatalog
        moviesGenreGroups={moviesGenreGroups}
        activeGenre={activeGenre}
        onGenreChange={onGenreChange}/>
      <PageFooter/>
    </div>
  );
}

MyListPage.propTypes = {
  /** Данные пользователя */
  user: UserBlock.propTypes.user,
  /** Список отображаемых фильмов группированных по жанрам */
  moviesGenreGroups: MoviesCatalog.propTypes.moviesGenreGroups,
  /** Активный жанр */
  activeGenre: MoviesCatalog.propTypes.activeGenre,
  /** Изменить фильтр списка фильмов по жанру */
  onGenreChange: MoviesCatalog.propTypes.onGenreChange,
  /** Авторизовать пользователя */
  onSignIn: PropTypes.func,
  /** Вложенные элементы */
  children: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    moviesGenreGroups: getMoviesByGenres(state),
    activeGenre: getActiveGenre(state),
    user: getUserProfile(state),
  };
};
const mapDispatchToProps = {
  onGenreChange: changeMoviesActiveGenre,
  onSignIn: requireAuthorization,
};

export {MyListPage};
export default connect(mapStateToProps, mapDispatchToProps)(MyListPage);

