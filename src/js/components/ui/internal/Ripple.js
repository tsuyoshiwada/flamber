import React, { PropTypes } from "react";
import shareConfig from "../../../../share-config.json";
import bindHandlers from "../../../helpers/bind-handlers";

const RIPPLE_DURATION = shareConfig["ripple-duration"];

export default class Ripple extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onRequestHide: PropTypes.func
  };

  static defaultProps = {
    className: "",
    style: {},
    onRequestHide: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      show: true
    };

    this.timer = null;

    bindHandlers([
      "handleTimeout"
    ], this);
  }

  componentDidMount() {
    this.timer = setTimeout(this.handleTimeout, RIPPLE_DURATION);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = null;
    this.setState({ show: true });
  }

  handleTimeout() {
    clearTimeout(this.timer);
    this.timer = null;
    this.setState({ show: false });
    this.props.onRequestHide();
  }

  render() {
    const {
      className,
      style
    } = this.props;

    const {
      show
    } = this.state;

    if (!show) return null;

    return (
      <div className={className} style={style}></div>
    );
  }
}