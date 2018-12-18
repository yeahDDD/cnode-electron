import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';
import {
  TodoFilter,
  TODO_FILTER_TITLES,
  TODO_FILTER_TYPES,
  STORE_ROUTER
} from '../../constants';
import {
  RouterStore
} from '../../stores';
import { inject, observer } from 'mobx-react';

export interface FooterProps {
  filter: TodoFilter;
  activeCount: number;
  completedCount: number;
  onChangeFilter: (filter: TodoFilter) => any;
  onClearCompleted: () => any;
  router?: RouterStore;
}

export interface FooterState {
  /* empty */
}
@inject(STORE_ROUTER)
@observer
export class Footer extends React.Component<FooterProps, FooterState> {
  renderTodoCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className={style.count}>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderFilterLink(filter: TodoFilter) {
    const title = TODO_FILTER_TITLES[filter];
    const { filter: selectedFilter, onChangeFilter } = this.props;
    const className = classNames({
      [style.selected]: filter === selectedFilter
    });

    return (
      <a
        className={className}
        style={{ cursor: 'pointer' }}
        onClick={() => onChangeFilter(filter)}
      >
        {title}
      </a>
    );
  }

  renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount > 0) {
      return (
        <button className={style.clearCompleted} onClick={onClearCompleted} />
      );
    }
  }

  render() {
    return (
      <footer className={style.normal}>
        {this.renderTodoCount()}
        <ul className={style.filters}>
          {TODO_FILTER_TYPES.map((filter) => (
            <li key={filter} children={this.renderFilterLink(filter)} />
          ))}
        </ul>
        {/* {this.renderClearButton()} */}
        <button className={style.clearCompleted} onClick={e => {
          console.error(1)
          console.error("this.props", this.props)
          this.props.router.push("/hello")
        }}>tocode</button>
      </footer>
    );
  }
}

export default Footer;
