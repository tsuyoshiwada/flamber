import React, { PropTypes } from "react";
import MDSpinner from "react-md-spinner";
import bem from "../../../../helpers/bem";
import mergeClassNames from "../../../../helpers/merge-class-names";

export default function Card({
  children,
  baseClassName,
  className,
  style,
  processing,
  onClick,
  onMouseEnter,
  onMouseLeave
}) {
  const b = bem(baseClassName.trim());

  return <div
    className={mergeClassNames(b(), className)}
    style={style}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className={b("process-overlay", { processing })}>
      <MDSpinner className={b("process-overlay__spinner")} size={22} />
    </div>
    <div className={b("inner")}>
      {children}
    </div>
  </div>;
}

Card.propTypes = {
  children: PropTypes.node,
  baseClassName: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  processing: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

Card.defaultProps = {
  style: {},
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {}
};
