import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("list");

export default class List extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  render() {
    const {
      children,
      className
    } = this.props;

    const cloneChildren = children.map((item, index) =>
      React.cloneElement(item, {
        key: item.props.text,
        index
      })
    );

    return (
      <div className={mergeClassNames(b(), className)}>
        {cloneChildren}
      </div>
    );
  }
}
