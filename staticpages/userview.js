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
        _this.state = { loaded: false, activeFeature: 'none' };
        _this.data = {};

        _this.featureToViewMap = new Map();
        _this.featureToViewMap.set('Store Encrypted Data', SED_Form);

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
        key: 'onFeature',
        value: function onFeature(event, name) {
            console.log(name);
            this.setState({ activeFeature: name });
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
            var _this4 = this;

            var disp = void 0;

            if (this.state.loaded) {
                if (this.state.activeFeature == 'none') {
                    var feat = this.data.features;
                    var featureList = React.createElement(
                        'div',
                        null,
                        feat.map(function (feature) {
                            return React.createElement(
                                'button',
                                { onClick: function onClick(e) {
                                        return _this4.onFeature(e, feature.name);
                                    }, key: feature.name },
                                feature.name
                            );
                        })
                    );

                    disp = React.createElement(
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
                } else {

                    var CustomForm = this.featureToViewMap.get(this.state.activeFeature);

                    disp = React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'button',
                                { onClick: function onClick(e) {
                                        return _this4.onFeature(e, 'none');
                                    } },
                                'Back'
                            ),
                            React.createElement(
                                'p',
                                null,
                                this.state.activeFeature
                            )
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(CustomForm, null)
                        )
                    );
                }
            }

            return React.createElement(
                'div',
                null,
                disp
            );
        }
    }]);

    return UserViewTop;
}(React.Component);