import autoBind from "auto-bind";
import moment from "moment";
import React, { PropTypes } from "react";
import * as Layout from "../../../constants/layouts";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import {
  Card,
  CardBody,
  CardCol,
  CardMedia,
  CardMore,
  CardOverlay,
  CardText,
  CardTitle
} from "../internal/Card/";
import {
  Label,
  FlatButton,
  IconButton
} from "../";
import {
  FilesIcon,
  TrashIcon
} from "../../svg-icons";

export default class BoardCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    id: PropTypes.string,
    processing: PropTypes.bool,
    selected: PropTypes.bool,
    title: PropTypes.string,
    image: PropTypes.string,
    layout: PropTypes.oneOf([Layout.GRID, Layout.LIST]),
    itemCount: PropTypes.number,
    lastModified: PropTypes.instanceOf(Date),
    onClick: PropTypes.func,
    onSelect: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
  };

  static defaultProps = {
    style: {},
    layout: Layout.GRID,
    processing: false,
    selected: false,
    itemCount: 0,
    onClick: () => {},
    onSelect: () => {},
    onEdit: () => {},
    onDelete: () => {}
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleClick() {
    this.props.onClick(this.props.id);
  }

  handleSelectClick(e) {
    e.stopPropagation();
  }

  handleSelect() {
    this.props.onSelect(this.props.id);
  }

  handleEditClick(e) {
    e.stopPropagation();
    this.props.onEdit(this.props.id);
  }

  handleDeleteClick(e) {
    e.stopPropagation();
    this.props.onDelete(this.props.id);
  }

  renderMoreActions() {
    return (
      <IconButton icon={<TrashIcon />} tooltip="削除する" onClick={this.handleDeleteClick} />
    );
  }

  renderList() {
    const {
      className,
      style,
      processing,
      selected,
      title,
      image,
      itemCount,
      lastModified
    } = this.props;

    const baseClassName = "board-card--list";
    const b = bem(baseClassName);

    return (
      <Card
        baseClassName={baseClassName}
        className={mergeClassNames(b({ selected })(), className)}
        style={style}
        processing={processing}
      >
        <CardCol baseClassName={baseClassName} className={b("col--media")()}>
          <CardMedia
            baseClassName={baseClassName}
            image={image}
          />
        </CardCol>
        <CardCol baseClassName={baseClassName} className={b("col--body")()}>
          <CardBody baseClassName={baseClassName}>
            <CardTitle baseClassName={baseClassName}>{title}</CardTitle>
            <CardText baseClassName={baseClassName}>
              Last updated {moment(lastModified).format("YYYY.MM.DD")}
            </CardText>
          </CardBody>
        </CardCol>
        <CardCol baseClassName={baseClassName} className={b("col--meta")()}>
          <span className={b("label")()}><FilesIcon /> {itemCount}</span>
        </CardCol>
        <CardCol baseClassName={baseClassName} className={b("col--more")()}>
          <CardMore
            baseClassName={baseClassName}
            actions={this.renderMoreActions()}
          />
        </CardCol>
      </Card>
    );
  }

  renderGrid() {
    const {
      className,
      style,
      processing,
      selected,
      title,
      image,
      itemCount,
      lastModified
    } = this.props;

    const baseClassName = "board-card";
    const b = bem(baseClassName);

    return (
      <Card
        baseClassName={baseClassName}
        className={mergeClassNames(b({ selected })(), className)}
        style={style}
        processing={processing}
        onClick={this.handleClick}
      >
        <CardMedia
          baseClassName={baseClassName}
          image={image}
          overlay={<CardOverlay
            baseClassName={baseClassName}
            selectable={true}
            selected={selected}
            moreActions={this.renderMoreActions()}
            actions={<FlatButton onClick={this.handleEditClick}>Edit board</FlatButton>}
            onClick={this.handleSelectClick}
            onSelect={this.handleSelect}
          />}
        >
          <Label className={b("label")()} icon={<FilesIcon />}>{itemCount}</Label>
        </CardMedia>
        <CardBody baseClassName={baseClassName}>
          <CardTitle baseClassName={baseClassName}>{title}</CardTitle>
          <CardText baseClassName={baseClassName}>
            Last updated {moment(lastModified).format("YYYY.MM.DD")}
          </CardText>
        </CardBody>
      </Card>
    );
  }

  render() {
    const { layout } = this.props;

    switch (layout) {
      case Layout.GRID:
        return this.renderGrid();
      case Layout.LIST:
        return this.renderList();
    }
  }
}
