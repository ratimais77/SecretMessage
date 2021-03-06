var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserViewTop = function (_React$Component) {
    _inherits(UserViewTop, _React$Component);

    function UserViewTop(props) {
        _classCallCheck(this, UserViewTop);

        var _this = _possibleConstructorReturn(this, (UserViewTop.__proto__ || Object.getPrototypeOf(UserViewTop)).call(this, props));

        _this.setOwnerState = props.setOwnerState;

        console.log(_this.setOwnerState);
        _this.state = { loaded: false };
        _this.data = {};

        _this.onLogOut = _this.onLogOut.bind(_this);
        return _this;
    }

    _createClass(UserViewTop, [{
        key: 'onLogOut',
        value: function onLogOut(event) {
            var _this2 = this;

            var requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            };
            fetch('logout', requestOptions).then(function (response) {
                return response.json();
            }).then(function (data) {
                if (data.code == "loggedOut") {
                    console.log(data);
                    _this2.setOwnerState({ loggedIn: false });
                }
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            var requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: this.state.userName, password: this.state.password })
            };
            fetch('getUserInfo', requestOptions).then(function (response) {
                return response.json();
            }).then(function (data) {

                if (data.code == "userInfo") {
                    _this3.data = data;
                    _this3.setState({ loaded: true });
                    console.log(_this3.data);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var featureList = void 0;
            if (this.state.loaded) {

                var feat = this.data.features;

                featureList = React.createElement(
                    'div',
                    null,
                    feat.map(function (feature) {
                        return React.createElement(
                            'p',
                            { key: feature.name },
                            feature.name
                        );
                    })
                );
            }

            return React.createElement(
                'div',
                { style: divStyle },
                React.createElement(
                    'label',
                    null,
                    'Hello User'
                ),
                React.createElement('br', null),
                featureList,
                React.createElement(
                    'button',
                    { onClick: this.onLogOut },
                    'Log Out'
                )
            );
        }
    }]);

    return UserViewTop;
}(React.Component);