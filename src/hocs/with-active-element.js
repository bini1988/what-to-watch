import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withActiveElement = (Component) => {
  class WithActiveElement extends PureComponent {
    constructor(props) {
      super(props);

      this._setActiveElement = this._setActiveElement.bind(this);
      this._resetActiveElement = this._resetActiveElement.bind(this);

      this.initialState = {activeElement: undefined};
      this.state = this.initialState;
    }

    render() {
      return <Component
        {...this.props}
        activeElement={this.state.activeElement}
        setActiveElement={this._setActiveElement}
        resetActiveElement={this._resetActiveElement}/>;
    }

    _setActiveElement(element) {
      this.setState({activeElement: element});
    }

    _resetActiveElement() {
      this.setState(this.initialState);
    }
  }

  WithActiveElement.propTypes = Component.propTypes;

  return WithActiveElement;
};

export const withActiveElementProps = {
  /** Активный элемент */
  activeElement: PropTypes.any,
  /** Задать активный элемент */
  setActiveElement: PropTypes.func,
  /** Сбросить активный элемент */
  resetActiveElement: PropTypes.func,
};

export default withActiveElement;
