"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayPalButton = void 0;

require("@babel/polyfill");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

// eslint-disable-next-line
var Button = paypal.Buttons.driver("react", {
  React: _react.default,
  ReactDOM: _reactDom.default
});

var PayPalButton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PayPalButton, _React$Component);

  function PayPalButton() {
    _classCallCheck(this, PayPalButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(PayPalButton).apply(this, arguments));
  }

  _createClass(PayPalButton, [{
    key: "createOrder",
    value: function createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            currency_code: this.props.currency,
            value: this.props.amount.toString()
          }
        }]
      });
    }
  }, {
    key: "onApprove",
    value: function onApprove(data, actions) {
      var _this = this;

      return actions.order.capture().then(function (details) {
        if (_this.props.onSuccess) {
          return _this.props.onSuccess(details);
        }
      }); // .catch((err) => {
      //     return this.props.onError &&
      //         this.props.onError(err);
      // });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          amount = _this$props.amount,
          onSuccess = _this$props.onSuccess,
          createOrder = _this$props.createOrder,
          onApprove = _this$props.onApprove,
          style = _this$props.style;
      return _react.default.createElement(Button, _extends({}, this.props, {
        createOrder: amount && !createOrder ? function (data, actions) {
          return _this2.createOrder(data, actions);
        } : function (data, actions) {
          return createOrder(data, actions);
        },
        onApprove: onSuccess ? function (data, actions) {
          return _this2.onApprove(data, actions);
        } : function (data, actions) {
          return onApprove(data, actions);
        },
        style: style
      }));
    }
  }]);

  return PayPalButton;
}(_react.default.Component); // eslint-disable-next-line


exports.PayPalButton = PayPalButton;
PayPalButton.defaultProps = {
  currency: "USD",
  style: {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiQnV0dG9uIiwicGF5cGFsIiwiQnV0dG9ucyIsImRyaXZlciIsIlJlYWN0IiwiUmVhY3RET00iLCJQYXlQYWxCdXR0b24iLCJkYXRhIiwiYWN0aW9ucyIsIm9yZGVyIiwiY3JlYXRlIiwicHVyY2hhc2VfdW5pdHMiLCJhbW91bnQiLCJjdXJyZW5jeV9jb2RlIiwicHJvcHMiLCJjdXJyZW5jeSIsInZhbHVlIiwidG9TdHJpbmciLCJjYXB0dXJlIiwidGhlbiIsImRldGFpbHMiLCJvblN1Y2Nlc3MiLCJjcmVhdGVPcmRlciIsIm9uQXBwcm92ZSIsInN0eWxlIiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0EsSUFBTUEsTUFBTSxHQUFHQyxNQUFNLENBQUNDLE9BQVAsQ0FBZUMsTUFBZixDQUFzQixPQUF0QixFQUErQjtBQUFFQyxFQUFBQSxLQUFLLEVBQUxBLGNBQUY7QUFBU0MsRUFBQUEsUUFBUSxFQUFSQTtBQUFULENBQS9CLENBQWY7O0lBWU1DLFk7Ozs7Ozs7Ozs7Ozs7Z0NBQ1VDLEksRUFBV0MsTyxFQUFjO0FBQ2pDLGFBQU9BLE9BQU8sQ0FBQ0MsS0FBUixDQUNGQyxNQURFLENBQ0s7QUFDSkMsUUFBQUEsY0FBYyxFQUFFLENBQUM7QUFDYkMsVUFBQUEsTUFBTSxFQUFFO0FBQ0pDLFlBQUFBLGFBQWEsRUFBRSxLQUFLQyxLQUFMLENBQVdDLFFBRHRCO0FBRUpDLFlBQUFBLEtBQUssRUFBRSxLQUFLRixLQUFMLENBQVdGLE1BQVgsQ0FBa0JLLFFBQWxCO0FBRkg7QUFESyxTQUFEO0FBRFosT0FETCxDQUFQO0FBU0g7Ozs4QkFFU1YsSSxFQUFXQyxPLEVBQWM7QUFBQTs7QUFDL0IsYUFBT0EsT0FBTyxDQUFDQyxLQUFSLENBQ0ZTLE9BREUsR0FFRkMsSUFGRSxDQUVHLFVBQUNDLE9BQUQsRUFBYTtBQUNmLFlBQUksS0FBSSxDQUFDTixLQUFMLENBQVdPLFNBQWYsRUFBMEI7QUFDdEIsaUJBQU8sS0FBSSxDQUFDUCxLQUFMLENBQVdPLFNBQVgsQ0FBcUJELE9BQXJCLENBQVA7QUFDSDtBQUNKLE9BTkUsQ0FBUCxDQUQrQixDQVEzQjtBQUNBO0FBQ0E7QUFDQTtBQUNQOzs7NkJBRVE7QUFBQTs7QUFBQSx3QkFPRCxLQUFLTixLQVBKO0FBQUEsVUFFREYsTUFGQyxlQUVEQSxNQUZDO0FBQUEsVUFHRFMsU0FIQyxlQUdEQSxTQUhDO0FBQUEsVUFJREMsV0FKQyxlQUlEQSxXQUpDO0FBQUEsVUFLREMsU0FMQyxlQUtEQSxTQUxDO0FBQUEsVUFNREMsS0FOQyxlQU1EQSxLQU5DO0FBU0wsYUFDSSw2QkFBQyxNQUFELGVBQ1EsS0FBS1YsS0FEYjtBQUVJLFFBQUEsV0FBVyxFQUNQRixNQUFNLElBQUksQ0FBQ1UsV0FBWCxHQUNNLFVBQUNmLElBQUQsRUFBWUMsT0FBWjtBQUFBLGlCQUE2QixNQUFJLENBQUNjLFdBQUwsQ0FBaUJmLElBQWpCLEVBQXVCQyxPQUF2QixDQUE3QjtBQUFBLFNBRE4sR0FFTSxVQUFDRCxJQUFELEVBQVlDLE9BQVo7QUFBQSxpQkFBNkJjLFdBQVcsQ0FBQ2YsSUFBRCxFQUFPQyxPQUFQLENBQXhDO0FBQUEsU0FMZDtBQU9JLFFBQUEsU0FBUyxFQUNMYSxTQUFTLEdBQ0gsVUFBQ2QsSUFBRCxFQUFZQyxPQUFaO0FBQUEsaUJBQTZCLE1BQUksQ0FBQ2UsU0FBTCxDQUFlaEIsSUFBZixFQUFxQkMsT0FBckIsQ0FBN0I7QUFBQSxTQURHLEdBRUgsVUFBQ0QsSUFBRCxFQUFZQyxPQUFaO0FBQUEsaUJBQTZCZSxTQUFTLENBQUNoQixJQUFELEVBQU9DLE9BQVAsQ0FBdEM7QUFBQSxTQVZkO0FBWUksUUFBQSxLQUFLLEVBQUVnQjtBQVpYLFNBREo7QUFnQkg7Ozs7RUFwRHNCcEIsZUFBTXFCLFMsR0F1RGpDOzs7O0FBQ0FuQixZQUFZLENBQUNvQixZQUFiLEdBQTRCO0FBQzFCWCxFQUFBQSxRQUFRLEVBQUUsS0FEZ0I7QUFFMUJTLEVBQUFBLEtBQUssRUFBRTtBQUZtQixDQUE1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIkBiYWJlbC9wb2x5ZmlsbFwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5jb25zdCBCdXR0b24gPSBwYXlwYWwuQnV0dG9ucy5kcml2ZXIoXCJyZWFjdFwiLCB7IFJlYWN0LCBSZWFjdERPTSB9KTtcblxuZXhwb3J0IGludGVyZmFjZSBQYXlQYWxCdXR0b25Qcm9wcyB7XG4gICAgYW1vdW50PzogbnVtYmVyfHN0cmluZyxcbiAgICBjdXJyZW5jeT86IHN0cmluZyxcbiAgICBvblN1Y2Nlc3M/OiBGdW5jdGlvbixcbiAgICBvbkVycm9yPzogRnVuY3Rpb24sXG4gICAgY3JlYXRlT3JkZXI/OiBGdW5jdGlvbixcbiAgICBvbkFwcHJvdmU/OiBGdW5jdGlvbixcbiAgICBzdHlsZT86IEZ1bmN0aW9uXG59XG5cbmNsYXNzIFBheVBhbEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxQYXlQYWxCdXR0b25Qcm9wcywge30+IHtcbiAgICBjcmVhdGVPcmRlcihkYXRhOiBhbnksIGFjdGlvbnM6IGFueSkge1xuICAgICAgICByZXR1cm4gYWN0aW9ucy5vcmRlclxuICAgICAgICAgICAgLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgcHVyY2hhc2VfdW5pdHM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGFtb3VudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3lfY29kZTogdGhpcy5wcm9wcy5jdXJyZW5jeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLmFtb3VudC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uQXBwcm92ZShkYXRhOiBhbnksIGFjdGlvbnM6IGFueSkge1xuICAgICAgICByZXR1cm4gYWN0aW9ucy5vcmRlclxuICAgICAgICAgICAgLmNhcHR1cmUoKVxuICAgICAgICAgICAgLnRoZW4oKGRldGFpbHMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25TdWNjZXNzKGRldGFpbHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgLy8gICAgIHJldHVybiB0aGlzLnByb3BzLm9uRXJyb3IgJiZcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5wcm9wcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGFtb3VudCxcbiAgICAgICAgICAgIG9uU3VjY2VzcyxcbiAgICAgICAgICAgIGNyZWF0ZU9yZGVyLFxuICAgICAgICAgICAgb25BcHByb3ZlLFxuICAgICAgICAgICAgc3R5bGVcbiAgICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICBjcmVhdGVPcmRlcj17XG4gICAgICAgICAgICAgICAgICAgIGFtb3VudCAmJiAhY3JlYXRlT3JkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSA9PiB0aGlzLmNyZWF0ZU9yZGVyKGRhdGEsIGFjdGlvbnMpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChkYXRhOiBhbnksIGFjdGlvbnM6IGFueSkgPT4gY3JlYXRlT3JkZXIoZGF0YSwgYWN0aW9ucylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb25BcHByb3ZlPXtcbiAgICAgICAgICAgICAgICAgICAgb25TdWNjZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICA/IChkYXRhOiBhbnksIGFjdGlvbnM6IGFueSkgPT4gdGhpcy5vbkFwcHJvdmUoZGF0YSwgYWN0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSA9PiBvbkFwcHJvdmUoZGF0YSwgYWN0aW9ucylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuUGF5UGFsQnV0dG9uLmRlZmF1bHRQcm9wcyA9IHtcbiAgY3VycmVuY3k6IFwiVVNEXCIsXG4gIHN0eWxlOiB7fVxufVxuXG5leHBvcnQgeyBQYXlQYWxCdXR0b24gfVxuIl19