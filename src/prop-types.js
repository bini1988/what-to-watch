import PropTypes from "prop-types";

/**
 * Отзыв к фильму
 */
export const MovieReviewPropTypes = PropTypes.shape({
  id: PropTypes.number,
  /** Текст отзыва */
  comment: PropTypes.string,
  /** Автор */
  author: PropTypes.string,
  /** Отформатированная дата */
  date: PropTypes.string,
  /** Дата */
  datetime: PropTypes.string,
  /** Рейтинг */
  rating: PropTypes.number,
});

/**
 * Рейтинг фильма
 */
export const MovieRatingPropTypes = PropTypes.shape({
  /** Оценка фильма */
  score: PropTypes.number.isRequired,
  /** Уровень оценки фильма */
  level: PropTypes.string.isRequired,
  /** Количество голосов за фильм */
  count: PropTypes.number.isRequired,
});

/**
 * Карточка фильма
 */
export const MovieCardPropTypes = PropTypes.shape({
  /** id фильма */
  id: PropTypes.number,
  /** Название фильма */
  title: PropTypes.string,
  /** Жанр фильма */
  genre: PropTypes.string,
  /** Год выхода */
  year: PropTypes.number,
  /** Описание фильма */
  description: PropTypes.string,
  /** Режисер фильма */
  director: PropTypes.string,
  /** Фильм входит в список пользователя */
  isInList: PropTypes.bool,
  /** Актерский состав */
  starring: PropTypes.arrayOf(
      PropTypes.string,
  ),
  /** Продолжительность фильма */
  duration: PropTypes.string,
  /** Набор изображений фильма */
  images: PropTypes.shape({
    /** Превью к трейлеру фильма */
    preview: PropTypes.string,
    /** Постер к фильму */
    poster: PropTypes.string,
    /** Оформление к фильму */
    background: PropTypes.string,
    /** Цветовое оформление к фильму */
    backgroundColor: PropTypes.string,
  }),
  /** Путь к трейлеру фильма */
  trailer: PropTypes.string,
  /** Рейтинг фильма */
  rating: MovieRatingPropTypes,
  /** Отзывы к фильму */
  reviews: PropTypes.arrayOf(
      MovieReviewPropTypes,
  ),
});

