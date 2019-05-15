"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayPalButton = void 0;

require("@babel/polyfill");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PayPalButton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PayPalButton, _React$Component);

  function PayPalButton(props) {
    var _this;

    _classCallCheck(this, PayPalButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PayPalButton).call(this, props));
    _this.state = {
      isSdkReady: false
    };
    return _this;
  }

  _createClass(PayPalButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (window !== undefined && window.paypal === undefined) {
        this.addPaypalSdk();
      } else if (window !== undefined && window.paypal !== undefined && this.props.onButtonReady) {
        this.props.onButtonReady();
      }
    }
  }, {
    key: "createOrder",
    value: function createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            currency_code: this.props.currency ? this.props.currency : this.props.options && this.props.options.currency ? this.props.options.currency : "USD",
            value: this.props.amount.toString()
          }
        }]
      });
    }
  }, {
    key: "onApprove",
    value: function onApprove(data, actions) {
      var _this2 = this;

      return actions.order.capture().then(function (details) {
        if (_this2.props.onSuccess) {
          return _this2.props.onSuccess(details, data);
        }
      })["catch"](function (err) {
        if (_this2.props.catchError) {
          return _this2.props.catchError(err);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          amount = _this$props.amount,
          onSuccess = _this$props.onSuccess,
          createOrder = _this$props.createOrder,
          onApprove = _this$props.onApprove,
          style = _this$props.style,
          onShippingChange = _this$props.onShippingChange;
      var isSdkReady = this.state.isSdkReady;

      if (!isSdkReady && window.paypal === undefined) {
        return null;
      }

      var Button = window.paypal.Buttons.driver("react", {
        React: _react["default"],
        ReactDOM: _reactDom["default"]
      });
      return _react["default"].createElement(Button, _extends({}, this.props, {
        createOrder: amount && !createOrder ? function (data, actions) {
          return _this3.createOrder(data, actions);
        } : function (data, actions) {
          return createOrder(data, actions);
        },
        onApprove: onSuccess ? function (data, actions) {
          return _this3.onApprove(data, actions);
        } : function (data, actions) {
          return onApprove(data, actions);
        },
        style: style
      }));
    }
  }, {
    key: "addPaypalSdk",
    value: function addPaypalSdk() {
      var _this4 = this;

      var _this$props2 = this.props,
          options = _this$props2.options,
          onButtonReady = _this$props2.onButtonReady;
      var queryParams = []; // replacing camelCase with dashes

      Object.keys(options).forEach(function (k) {
        var name = k.split(/(?=[A-Z])/).join("-").toLowerCase();
        queryParams.push("".concat(name, "=").concat(options[k]));
      });
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://www.paypal.com/sdk/js?".concat(queryParams.join("&"));
      script.async = true;

      script.onload = function () {
        _this4.setState({
          isSdkReady: true
        });

        if (onButtonReady) {
          onButtonReady();
        }
      };

      script.onerror = function () {
        throw new Error("Paypal SDK could not be loaded.");
      };

      document.body.appendChild(script);
    }
  }]);

  return PayPalButton;
}(_react["default"].Component);

exports.PayPalButton = PayPalButton;

_defineProperty(PayPalButton, "propTypes", {
  amount: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  currency: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  onSuccess: _propTypes["default"].func,
  catchError: _propTypes["default"].func,
  onError: _propTypes["default"].func,
  createOrder: _propTypes["default"].func,
  onApprove: _propTypes["default"].func,
  style: _propTypes["default"].object,
  options: _propTypes["default"].shape({
    clientId: _propTypes["default"].string,
    merchantId: _propTypes["default"].string,
    currency: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
    intent: _propTypes["default"].string,
    commit: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string]),
    vault: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string]),
    component: _propTypes["default"].string,
    disableFunding: _propTypes["default"].string,
    disableCard: _propTypes["default"].string,
    integrationDate: _propTypes["default"].string,
    locale: _propTypes["default"].string,
    buyerCountry: _propTypes["default"].string,
    debug: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string])
  }),
  onButtonReady: _propTypes["default"].func
});

_defineProperty(PayPalButton, "defaultProps", {
  style: {},
  options: {
    clientId: "sb",
    currency: "USD"
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiUGF5UGFsQnV0dG9uIiwicHJvcHMiLCJzdGF0ZSIsImlzU2RrUmVhZHkiLCJ3aW5kb3ciLCJ1bmRlZmluZWQiLCJwYXlwYWwiLCJhZGRQYXlwYWxTZGsiLCJvbkJ1dHRvblJlYWR5IiwiZGF0YSIsImFjdGlvbnMiLCJvcmRlciIsImNyZWF0ZSIsInB1cmNoYXNlX3VuaXRzIiwiYW1vdW50IiwiY3VycmVuY3lfY29kZSIsImN1cnJlbmN5Iiwib3B0aW9ucyIsInZhbHVlIiwidG9TdHJpbmciLCJjYXB0dXJlIiwidGhlbiIsImRldGFpbHMiLCJvblN1Y2Nlc3MiLCJlcnIiLCJjYXRjaEVycm9yIiwiY3JlYXRlT3JkZXIiLCJvbkFwcHJvdmUiLCJzdHlsZSIsIm9uU2hpcHBpbmdDaGFuZ2UiLCJCdXR0b24iLCJCdXR0b25zIiwiZHJpdmVyIiwiUmVhY3QiLCJSZWFjdERPTSIsInF1ZXJ5UGFyYW1zIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrIiwibmFtZSIsInNwbGl0Iiwiam9pbiIsInRvTG93ZXJDYXNlIiwicHVzaCIsInNjcmlwdCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJzcmMiLCJhc3luYyIsIm9ubG9hZCIsInNldFN0YXRlIiwib25lcnJvciIsIkVycm9yIiwiYm9keSIsImFwcGVuZENoaWxkIiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwib25lT2ZUeXBlIiwibnVtYmVyIiwic3RyaW5nIiwiZnVuYyIsIm9uRXJyb3IiLCJvYmplY3QiLCJzaGFwZSIsImNsaWVudElkIiwibWVyY2hhbnRJZCIsImludGVudCIsImNvbW1pdCIsImJvb2wiLCJ2YXVsdCIsImNvbXBvbmVudCIsImRpc2FibGVGdW5kaW5nIiwiZGlzYWJsZUNhcmQiLCJpbnRlZ3JhdGlvbkRhdGUiLCJsb2NhbGUiLCJidXllckNvdW50cnkiLCJkZWJ1ZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztB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ImltcG9ydCBcIkBiYWJlbC9wb2x5ZmlsbFwiO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGF5UGFsQnV0dG9uUHJvcHMge1xyXG4gICAgYW1vdW50PzogbnVtYmVyfHN0cmluZyxcclxuICAgIGN1cnJlbmN5PzogbnVtYmVyfHN0cmluZyxcclxuICAgIG9uU3VjY2Vzcz86IEZ1bmN0aW9uLFxyXG4gICAgY2F0Y2hFcnJvcj86IEZ1bmN0aW9uLFxyXG4gICAgb25FcnJvcj86IEZ1bmN0aW9uLFxyXG4gICAgY3JlYXRlT3JkZXI/OiBGdW5jdGlvbixcclxuICAgIG9uQXBwcm92ZT86IEZ1bmN0aW9uLFxyXG4gICAgc3R5bGU/OiBvYmplY3QsXHJcbiAgICBvcHRpb25zPzogUGF5cGFsT3B0aW9ucyxcclxuICAgIG9uQnV0dG9uUmVhZHk/OiBGdW5jdGlvbixcclxuICAgIG9uU2hpcHBpbmdDaGFuZ2U/OiBGdW5jdGlvbixcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQYXlQYWxCdXR0b25TdGF0ZSB7XHJcbiAgICBpc1Nka1JlYWR5OiBib29sZWFuXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGF5cGFsT3B0aW9ucyB7XHJcbiAgICBjbGllbnRJZD86IHN0cmluZyxcclxuICAgIG1lcmNoYW50SWQ/OiBzdHJpbmcsXHJcbiAgICBjdXJyZW5jeT86IG51bWJlcnxzdHJpbmcsXHJcbiAgICBpbnRlbnQ/OiBzdHJpbmcsXHJcbiAgICBjb21taXQ/OiBib29sZWFufHN0cmluZyxcclxuICAgIHZhdWx0PzogYm9vbGVhbnxzdHJpbmcsXHJcbiAgICBjb21wb25lbnQ/OiBzdHJpbmcsXHJcbiAgICBkaXNhYmxlRnVuZGluZz86IHN0cmluZyxcclxuICAgIGRpc2FibGVDYXJkPzogc3RyaW5nLFxyXG4gICAgaW50ZWdyYXRpb25EYXRlPzogc3RyaW5nLFxyXG4gICAgbG9jYWxlPzogc3RyaW5nLFxyXG4gICAgYnV5ZXJDb3VudHJ5Pzogc3RyaW5nLFxyXG4gICAgZGVidWc/OiBib29sZWFufHN0cmluZ1xyXG59XHJcblxyXG5jbGFzcyBQYXlQYWxCdXR0b24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UGF5UGFsQnV0dG9uUHJvcHMsIFBheVBhbEJ1dHRvblN0YXRlPiB7XHJcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xyXG4gICAgICAgIGFtb3VudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcbiAgICAgICAgICAgIFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgXSksXHJcbiAgICAgICAgY3VycmVuY3k6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgICAgICBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIF0pLFxyXG4gICAgICAgIG9uU3VjY2VzczogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgY2F0Y2hFcnJvcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgb25FcnJvcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgY3JlYXRlT3JkZXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIG9uQXBwcm92ZTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICAgICAgb3B0aW9uczogUHJvcFR5cGVzLnNoYXBlKHtcclxuICAgICAgICAgICAgY2xpZW50SWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIG1lcmNoYW50SWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIGN1cnJlbmN5OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuICAgICAgICAgICAgICAgIFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgaW50ZW50OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICBjb21taXQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgICAgICAgICAgUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgICAgICAgICBQcm9wVHlwZXMuc3RyaW5nXHJcbiAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICB2YXVsdDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcbiAgICAgICAgICAgICAgICBQcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICAgICAgICAgIFByb3BUeXBlcy5zdHJpbmdcclxuICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgIGNvbXBvbmVudDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICAgICAgZGlzYWJsZUZ1bmRpbmc6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIGRpc2FibGVDYXJkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICBpbnRlZ3JhdGlvbkRhdGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICAgICAgYnV5ZXJDb3VudHJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICBkZWJ1ZzogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcbiAgICAgICAgICAgICAgICBQcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICAgICAgICAgIFByb3BUeXBlcy5zdHJpbmdcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICB9KSxcclxuICAgICAgICBvbkJ1dHRvblJlYWR5OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgICAgIHN0eWxlOiB7fSxcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGNsaWVudElkOiBcInNiXCIsXHJcbiAgICAgICAgICAgIGN1cnJlbmN5OiBcIlVTRFwiXHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogUGF5UGFsQnV0dG9uUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGlzU2RrUmVhZHk6IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB3aW5kb3cgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICB3aW5kb3cucGF5cGFsID09PSB1bmRlZmluZWRcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRQYXlwYWxTZGsoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoXHJcbiAgICAgICAgICAgIHdpbmRvdyAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgIHdpbmRvdy5wYXlwYWwgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQnV0dG9uUmVhZHlcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkJ1dHRvblJlYWR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZU9yZGVyKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbnMub3JkZXJcclxuICAgICAgICAgICAgLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBwdXJjaGFzZV91bml0czogW3tcclxuICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3lfY29kZTogdGhpcy5wcm9wcy5jdXJyZW5jeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmN1cnJlbmN5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMucHJvcHMub3B0aW9ucyAmJiB0aGlzLnByb3BzLm9wdGlvbnMuY3VycmVuY3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5vcHRpb25zLmN1cnJlbmN5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiVVNEXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLmFtb3VudC50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQXBwcm92ZShkYXRhOiBhbnksIGFjdGlvbnM6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBhY3Rpb25zLm9yZGVyXHJcbiAgICAgICAgICAgIC5jYXB0dXJlKClcclxuICAgICAgICAgICAgLnRoZW4oKGRldGFpbHMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uU3VjY2VzcyhkZXRhaWxzLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmNhdGNoRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jYXRjaEVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIGFtb3VudCxcclxuICAgICAgICAgICAgb25TdWNjZXNzLFxyXG4gICAgICAgICAgICBjcmVhdGVPcmRlcixcclxuICAgICAgICAgICAgb25BcHByb3ZlLFxyXG4gICAgICAgICAgICBzdHlsZSxcclxuICAgICAgICAgICAgb25TaGlwcGluZ0NoYW5nZSxcclxuICAgICAgICB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7IGlzU2RrUmVhZHkgfSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgICAgIGlmICghaXNTZGtSZWFkeSAmJiB3aW5kb3cucGF5cGFsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBCdXR0b24gPSB3aW5kb3cucGF5cGFsLkJ1dHRvbnMuZHJpdmVyKFwicmVhY3RcIiwge1xyXG4gICAgICAgICAgICBSZWFjdCxcclxuICAgICAgICAgICAgUmVhY3RET00sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxyXG4gICAgICAgICAgICAgICAgY3JlYXRlT3JkZXI9e1xyXG4gICAgICAgICAgICAgICAgICAgIGFtb3VudCAmJiAhY3JlYXRlT3JkZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyAoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpID0+IHRoaXMuY3JlYXRlT3JkZXIoZGF0YSwgYWN0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpID0+IGNyZWF0ZU9yZGVyKGRhdGEsIGFjdGlvbnMpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvbkFwcHJvdmU9e1xyXG4gICAgICAgICAgICAgICAgICAgIG9uU3VjY2Vzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IChkYXRhOiBhbnksIGFjdGlvbnM6IGFueSkgPT4gdGhpcy5vbkFwcHJvdmUoZGF0YSwgYWN0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpID0+IG9uQXBwcm92ZShkYXRhLCBhY3Rpb25zKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRQYXlwYWxTZGsoKSB7XHJcbiAgICAgICAgY29uc3QgeyBvcHRpb25zLCBvbkJ1dHRvblJlYWR5IH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAvLyByZXBsYWNpbmcgY2FtZWxDYXNlIHdpdGggZGFzaGVzXHJcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChrID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGsuc3BsaXQoLyg/PVtBLVpdKS8pLmpvaW4oXCItXCIpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zLnB1c2goYCR7bmFtZX09JHtvcHRpb25zW2tdfWApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG4gICAgICAgIHNjcmlwdC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcclxuICAgICAgICBzY3JpcHQuc3JjID0gYGh0dHBzOi8vd3d3LnBheXBhbC5jb20vc2RrL2pzPyR7cXVlcnlQYXJhbXMuam9pbihcIiZcIil9YDtcclxuICAgICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xyXG4gICAgICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1Nka1JlYWR5OiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9uQnV0dG9uUmVhZHkpIHtcclxuICAgICAgICAgICAgICAgIG9uQnV0dG9uUmVhZHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NyaXB0Lm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBheXBhbCBTREsgY291bGQgbm90IGJlIGxvYWRlZC5cIik7XHJcbiAgICAgICAgfTtcclxuICAgIFxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgUGF5UGFsQnV0dG9uIH07XHJcbiJdfQ==