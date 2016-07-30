'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import {React} from 'react-for-atom';
import classnames from 'classnames';

export type Tab = {
  name: string,
  tabContent: React.Element<any>,
};

type Props = {
  tabs: Array<Tab>,
  activeTabName: string,
  closeable: boolean,
  onActiveTabChange: (tab: Tab) => void,
  onClose?: () => void,
  triggeringEvent: string,
};

export default class Tabs extends React.Component {
  props: Props;

  static defaultProps = {
    closeable: false,
    triggeringEvent: 'onClick',
  };

  constructor(props: Props) {
    super(props);

    (this: any)._handleTabChange = this._handleTabChange.bind(this);
    (this: any)._renderTabMenu = this._renderTabMenu.bind(this);
  }

  _handleTabChange(selectedTabName: string) {
    if (typeof this.props.onActiveTabChange === 'function') {
      this.props.onActiveTabChange(
        this.props.tabs.find(tab => tab.name === selectedTabName),
      );
    }
  }

  _renderTabMenu(): React.Element<any> {
    const closeButton = this.props.closeable
      ? <div className="close-icon" onClick={this.props.onClose} />
      : null;
    const tabs = this.props.tabs.map(tab => {
      const handler = {};
      handler[this.props.triggeringEvent] = this._handleTabChange.bind(this, tab.name);
      return (
        <li
          className={classnames({
            tab: true,
            active: this.props.activeTabName === tab.name,
          })}
          key={tab.name}
          {...handler}>
          <div className="title">
            {tab.tabContent}
          </div>
          {closeButton}
        </li>
      );
    });
    return (
      <ul className="tab-bar list-inline inset-panel">
        {tabs}
      </ul>
    );
  }

  render(): React.Element<any> {
    return (
      <div className="nuclide-tabs">
        {this._renderTabMenu()}
      </div>
    );
  }
}
