var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SED1_Form = function (_React$Component) {
    _inherits(SED1_Form, _React$Component);

    function SED1_Form(props) {
        _classCallCheck(this, SED1_Form);

        var _this = _possibleConstructorReturn(this, (SED1_Form.__proto__ || Object.getPrototypeOf(SED1_Form)).call(this, props));

        _this.state = { secretData: '' };

        _this.handleChangeUserName = _this.handleChangeUserName.bind(_this);
        _this.handleChangePassword = _this.handleChangePassword.bind(_this);
        return _this;
    }

    _createClass(SED1_Form, [{
        key: 'handleChangeDataName',
        value: function handleChangeDataName(event) {
            this.setState({ secretData: event.target.value });
        }
    }, {
        key: 'handleChangePassword',
        value: function handleChangePassword(event) {
            this.setState({ password: event.target.value });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            var _this2 = this;

            var requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: this.state.userName, password: this.state.password })
            };
            fetch('login', requestOptions).then(function (response) {
                return response.json();
            }).then(function (data) {
                if (data.code == "loginOK") {
                    _this2.setState({ loggedIn: true });
                    _this2.setOwnerState({ loggedIn: true });
                } else if (data.code == "loginFailed") {
                    _this2.setState({ loggedIn: false });
                    _this2.setOwnerState({ loggedIn: false });
                }
            });

            event.preventDefault();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h1',
                        null,
                        'SED1'
                    ),
                    React.createElement(
                        'form',
                        { onSubmit: this.handleSubmit },
                        React.createElement(
                            'label',
                            null,
                            'Enter Your Secret Data Here'
                        ),
                        React.createElement('br', null),
                        React.createElement('textarea', { value: this.state.userName, onChange: this.handleChangeUserName, name: 'Text1', cols: '40', rows: '5' }),
                        React.createElement(
                            'button',
                            null,
                            'Log In'
                        )
                    )
                )
            );
        }
    }]);

    return SED1_Form;
}(React.Component);