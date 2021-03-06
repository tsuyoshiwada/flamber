// @flow
import moment from "moment";
import React, { Component } from "react";
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
import { FilesIcon, TrashIcon, PicturesIcon } from "../../svg-icons";
import type { BoardId } from "../../../types/board";
import type { GridLayout, ListLayout } from "../../../types/prop-types";

type Props = {
  className?: string;
  style?: Object;
  id: BoardId;
  processing: boolean;
  selectable: boolean;
  selected: boolean;
  title: string;
  image: string;
  layout: GridLayout | ListLayout;
  itemCount: number;
  lastUpdatedAt: Date;
  onClick?: Function;
  onSelect?: Function;
  onEdit?: Function;
  onDelete?: Function;
  onCover?: Function;
};

export default class BoardCard extends Component {
  props: Props;

  static defaultProps = {
    layout: Layout.GRID,
    processing: false,
    selectable: false,
    selected: false,
    itemCount: 0
  };

  handleClick = () => {
    if (!this.props.selectable) {
      if (typeof this.props.onClick === "function") {
        this.props.onClick(this.props.id);
      }
    } else {
      this.callSelect();
    }
  }

  handleSelect = () => {
    this.callSelect();
  }

  handleEditClick = (e: SyntheticMouseEvent) => {
    e.stopPropagation();
    if (typeof this.props.onEdit === "function") {
      this.props.onEdit(this.props.id);
    }
  }

  handleDeleteClick = (e: SyntheticMouseEvent) => {
    e.stopPropagation();
    if (typeof this.props.onDelete === "function") {
      this.props.onDelete(this.props.id);
    }
  }

  handleCoverClick = (e: SyntheticMouseEvent) => {
    e.stopPropagation();
    if (typeof this.props.onCover === "function") {
      this.props.onCover(this.props.id);
    }
  }

  callSelect() {
    if (typeof this.props.onSelect === "function") {
      this.props.onSelect(this.props.id);
    }
  }

  renderMoreActions(): ?Array<React$Element<any>> {
    return this.props.selectable ? null : [
      <IconButton icon={<TrashIcon />} tooltip="削除する" onClick={this.handleDeleteClick} />,
      <IconButton
        icon={<PicturesIcon />}
        tooltip="カバー画像の変更"
        tooltipOrigin={{ vertical: "top", horizontal: "left" }}
        onClick={this.handleCoverClick}
      />
    ];
  }

  renderList(): React$Element<any> {
    const {
      className,
      style,
      processing,
      selected,
      title,
      image,
      itemCount,
      lastUpdatedAt
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
              Last updated {moment(lastUpdatedAt).format("YYYY.MM.DD")}
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

  renderGrid(): React$Element<any> {
    const {
      className,
      style,
      processing,
      selectable,
      selected,
      title,
      image,
      itemCount,
      lastUpdatedAt
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
            actions={!selectable ? <FlatButton>Edit board</FlatButton> : null}
            onSelect={this.handleSelect}
          />}
        >
          <Label className={b("label")()} icon={<FilesIcon />}>{itemCount}</Label>
        </CardMedia>
        <CardBody baseClassName={baseClassName}>
          <CardTitle baseClassName={baseClassName}>{title}</CardTitle>
          <CardText baseClassName={baseClassName}>
            Last updated {moment(lastUpdatedAt).format("YYYY.MM.DD")}
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
