

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var _require = require('react-for-atom');

var React = _require.React;
var PropTypes = React.PropTypes;

var BreakpointStore = require('./BreakpointStore.js');
var DebuggerActions = require('./DebuggerActions');
var DebuggerInspector = require('./DebuggerInspector');
var DebuggerSessionSelector = require('./DebuggerSessionSelector');
var DebuggerStore = require('./DebuggerStore');
var Bridge = require('./Bridge');

function getStateFromStore(store) {
  return {
    hasDebuggerProcess: !!store.getDebuggerProcess(),
    processSocket: store.getProcessSocket()
  };
}

var DebuggerControllerView = React.createClass({
  displayName: 'DebuggerControllerView',

  propTypes: {
    actions: PropTypes.instanceOf(DebuggerActions).isRequired,
    breakpointStore: PropTypes.instanceOf(BreakpointStore).isRequired,
    store: PropTypes.instanceOf(DebuggerStore).isRequired,
    bridge: PropTypes.instanceOf(Bridge).isRequired
  },

  getInitialState: function getInitialState() {
    return getStateFromStore(this.props.store);
  },

  componentWillMount: function componentWillMount() {
    this.setState({
      debuggerStoreChangeListener: this.props.store.onChange(this._updateStateFromStore)
    });
    this._updateStateFromStore();
  },

  componentWillUnmount: function componentWillUnmount() {
    var listener = this.state.debuggerStoreChangeListener;
    if (listener != null) {
      listener.dispose();
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var listener = this.state.debuggerStoreChangeListener;
    if (listener != null) {
      listener.dispose();
    }
    this.setState({
      debuggerStoreChangeListener: nextProps.store.onChange(this._updateStateFromStore)
    });
    this._updateStateFromStore(nextProps.store);
  },

  render: function render() {
    if (this.state.processSocket) {
      return React.createElement(DebuggerInspector, {
        actions: this.props.actions,
        bridge: this.props.bridge,
        breakpointStore: this.props.breakpointStore,
        socket: this.state.processSocket
      });
    }
    var closeButton = React.createElement('button', {
      title: 'Close',
      className: 'icon icon-x nuclide-debugger-root-close-button',
      onClick: this._handleClickClose
    });
    if (this.state.hasDebuggerProcess) {
      return React.createElement(
        'div',
        { className: 'padded' },
        closeButton,
        React.createElement(
          'p',
          null,
          'Starting Debugger'
        ),
        React.createElement('progress', { className: 'starting' })
      );
    }
    return React.createElement(
      'div',
      null,
      closeButton,
      React.createElement(DebuggerSessionSelector, { store: this.props.store, actions: this.props.actions })
    );
  },

  _handleClickClose: function _handleClickClose() {
    atom.commands.dispatch(atom.views.getView(atom.workspace), 'nuclide-debugger:toggle');
  },

  _updateStateFromStore: function _updateStateFromStore(store) {
    if (store != null) {
      this.setState(getStateFromStore(store));
    } else {
      this.setState(getStateFromStore(this.props.store));
    }
  }
});

module.exports = DebuggerControllerView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlYnVnZ2VyQ29udHJvbGxlclZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztlQVdnQixPQUFPLENBQUMsZ0JBQWdCLENBQUM7O0lBQWxDLEtBQUssWUFBTCxLQUFLO0lBQ0wsU0FBUyxHQUFJLEtBQUssQ0FBbEIsU0FBUzs7QUFDaEIsSUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDeEQsSUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDckQsSUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUN6RCxJQUFNLHVCQUF1QixHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQ3JFLElBQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ2pELElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFRbkMsU0FBUyxpQkFBaUIsQ0FBQyxLQUFvQixFQUFTO0FBQ3RELFNBQU87QUFDTCxzQkFBa0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFO0FBQ2hELGlCQUFhLEVBQUUsS0FBSyxDQUFDLGdCQUFnQixFQUFFO0dBQ3hDLENBQUM7Q0FDSDs7QUFFRCxJQUFNLHNCQUFzQixHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUMvQyxXQUFTLEVBQUU7QUFDVCxXQUFPLEVBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxVQUFVO0FBQ3pELG1CQUFlLEVBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxVQUFVO0FBQ2pFLFNBQUssRUFBRSxTQUFTLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVU7QUFDckQsVUFBTSxFQUFFLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVTtHQUNoRDs7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RDtHQUNGO0NBQ0YsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUMiLCJmaWxlIjoiRGVidWdnZXJDb250cm9sbGVyVmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuLyogQGZsb3cgKi9cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmNvbnN0IHtSZWFjdH0gPSByZXF1aXJlKCdyZWFjdC1mb3ItYXRvbScpO1xuY29uc3Qge1Byb3BUeXBlc30gPSBSZWFjdDtcbmNvbnN0IEJyZWFrcG9pbnRTdG9yZSA9IHJlcXVpcmUoJy4vQnJlYWtwb2ludFN0b3JlLmpzJyk7XG5jb25zdCBEZWJ1Z2dlckFjdGlvbnMgPSByZXF1aXJlKCcuL0RlYnVnZ2VyQWN0aW9ucycpO1xuY29uc3QgRGVidWdnZXJJbnNwZWN0b3IgPSByZXF1aXJlKCcuL0RlYnVnZ2VySW5zcGVjdG9yJyk7XG5jb25zdCBEZWJ1Z2dlclNlc3Npb25TZWxlY3RvciA9IHJlcXVpcmUoJy4vRGVidWdnZXJTZXNzaW9uU2VsZWN0b3InKTtcbmNvbnN0IERlYnVnZ2VyU3RvcmUgPSByZXF1aXJlKCcuL0RlYnVnZ2VyU3RvcmUnKTtcbmNvbnN0IEJyaWRnZSA9IHJlcXVpcmUoJy4vQnJpZGdlJyk7XG5cbnR5cGUgU3RhdGUgPSB7XG4gIGhhc0RlYnVnZ2VyUHJvY2VzczogYm9vbGVhbjtcbiAgcHJvY2Vzc1NvY2tldDogP3N0cmluZztcbiAgZGVidWdnZXJTdG9yZUNoYW5nZUxpc3RlbmVyPzogSURpc3Bvc2FibGU7XG59O1xuXG5mdW5jdGlvbiBnZXRTdGF0ZUZyb21TdG9yZShzdG9yZTogRGVidWdnZXJTdG9yZSk6IFN0YXRlIHtcbiAgcmV0dXJuIHtcbiAgICBoYXNEZWJ1Z2dlclByb2Nlc3M6ICEhc3RvcmUuZ2V0RGVidWdnZXJQcm9jZXNzKCksXG4gICAgcHJvY2Vzc1NvY2tldDogc3RvcmUuZ2V0UHJvY2Vzc1NvY2tldCgpLFxuICB9O1xufVxuXG5jb25zdCBEZWJ1Z2dlckNvbnRyb2xsZXJWaWV3ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBwcm9wVHlwZXM6IHtcbiAgICBhY3Rpb25zOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihEZWJ1Z2dlckFjdGlvbnMpLmlzUmVxdWlyZWQsXG4gICAgYnJlYWtwb2ludFN0b3JlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihCcmVha3BvaW50U3RvcmUpLmlzUmVxdWlyZWQsXG4gICAgc3RvcmU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKERlYnVnZ2VyU3RvcmUpLmlzUmVxdWlyZWQsXG4gICAgYnJpZGdlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihCcmlkZ2UpLmlzUmVxdWlyZWQsXG4gIH0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCk6IFN0YXRlIHtcbiAgICByZXR1cm4gZ2V0U3RhdGVGcm9tU3RvcmUodGhpcy5wcm9wcy5zdG9yZSk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGVidWdnZXJTdG9yZUNoYW5nZUxpc3RlbmVyOiB0aGlzLnByb3BzLnN0b3JlLm9uQ2hhbmdlKHRoaXMuX3VwZGF0ZVN0YXRlRnJvbVN0b3JlKSxcbiAgICB9KTtcbiAgICB0aGlzLl91cGRhdGVTdGF0ZUZyb21TdG9yZSgpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGNvbnN0IGxpc3RlbmVyID0gdGhpcy5zdGF0ZS5kZWJ1Z2dlclN0b3JlQ2hhbmdlTGlzdGVuZXI7XG4gICAgaWYgKGxpc3RlbmVyICE9IG51bGwpIHtcbiAgICAgIGxpc3RlbmVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IHtzdG9yZTogRGVidWdnZXJTdG9yZX0pIHtcbiAgICBjb25zdCBsaXN0ZW5lciA9IHRoaXMuc3RhdGUuZGVidWdnZXJTdG9yZUNoYW5nZUxpc3RlbmVyO1xuICAgIGlmIChsaXN0ZW5lciAhPSBudWxsKSB7XG4gICAgICBsaXN0ZW5lci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGVidWdnZXJTdG9yZUNoYW5nZUxpc3RlbmVyOiBuZXh0UHJvcHMuc3RvcmUub25DaGFuZ2UodGhpcy5fdXBkYXRlU3RhdGVGcm9tU3RvcmUpLFxuICAgIH0pO1xuICAgIHRoaXMuX3VwZGF0ZVN0YXRlRnJvbVN0b3JlKG5leHRQcm9wcy5zdG9yZSk7XG4gIH0sXG5cbiAgcmVuZGVyKCk6ID9SZWFjdEVsZW1lbnQge1xuICAgIGlmICh0aGlzLnN0YXRlLnByb2Nlc3NTb2NrZXQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxEZWJ1Z2dlckluc3BlY3RvclxuICAgICAgICAgIGFjdGlvbnM9e3RoaXMucHJvcHMuYWN0aW9uc31cbiAgICAgICAgICBicmlkZ2U9e3RoaXMucHJvcHMuYnJpZGdlfVxuICAgICAgICAgIGJyZWFrcG9pbnRTdG9yZT17dGhpcy5wcm9wcy5icmVha3BvaW50U3RvcmV9XG4gICAgICAgICAgc29ja2V0PXt0aGlzLnN0YXRlLnByb2Nlc3NTb2NrZXR9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IChcbiAgICAgIDxidXR0b25cbiAgICAgICAgdGl0bGU9XCJDbG9zZVwiXG4gICAgICAgIGNsYXNzTmFtZT1cImljb24gaWNvbi14IG51Y2xpZGUtZGVidWdnZXItcm9vdC1jbG9zZS1idXR0b25cIlxuICAgICAgICBvbkNsaWNrPXt0aGlzLl9oYW5kbGVDbGlja0Nsb3NlfVxuICAgICAgLz5cbiAgICApO1xuICAgIGlmICh0aGlzLnN0YXRlLmhhc0RlYnVnZ2VyUHJvY2Vzcykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWRkZWRcIj5cbiAgICAgICAgICB7Y2xvc2VCdXR0b259XG4gICAgICAgICAgPHA+U3RhcnRpbmcgRGVidWdnZXI8L3A+XG4gICAgICAgICAgPHByb2dyZXNzIGNsYXNzTmFtZT1cInN0YXJ0aW5nXCI+PC9wcm9ncmVzcz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge2Nsb3NlQnV0dG9ufVxuICAgICAgICA8RGVidWdnZXJTZXNzaW9uU2VsZWN0b3Igc3RvcmU9e3RoaXMucHJvcHMuc3RvcmV9IGFjdGlvbnM9e3RoaXMucHJvcHMuYWN0aW9uc30gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG5cbiAgX2hhbmRsZUNsaWNrQ2xvc2UoKSB7XG4gICAgYXRvbS5jb21tYW5kcy5kaXNwYXRjaChhdG9tLnZpZXdzLmdldFZpZXcoYXRvbS53b3Jrc3BhY2UpLCAnbnVjbGlkZS1kZWJ1Z2dlcjp0b2dnbGUnKTtcbiAgfSxcblxuICBfdXBkYXRlU3RhdGVGcm9tU3RvcmUoc3RvcmU/OiBEZWJ1Z2dlclN0b3JlKSB7XG4gICAgaWYgKHN0b3JlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoZ2V0U3RhdGVGcm9tU3RvcmUoc3RvcmUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZShnZXRTdGF0ZUZyb21TdG9yZSh0aGlzLnByb3BzLnN0b3JlKSk7XG4gICAgfVxuICB9LFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGVidWdnZXJDb250cm9sbGVyVmlldztcbiJdfQ==