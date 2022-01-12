var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginForm = function (_React$Component) {
  _inherits(LoginForm, _React$Component);

  function LoginForm(props) {
    _classCallCheck(this, LoginForm);

    var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

    _this.state = { userName: 'rati',
      password: 'pass',

      userNameCreate: '',
      passwordCreate: '',
      passwordCreateRepeat: '' };

    _this.handleChangeUserName = _this.handleChangeUserName.bind(_this);
    _this.handleChangePassword = _this.handleChangePassword.bind(_this);

    _this.handleChangeUserNameCreate = _this.handleChangeUserNameCreate.bind(_this);
    _this.handleChangePasswordCreate = _this.handleChangePasswordCreate.bind(_this);
    _this.handleChangePasswordCreateRepeat = _this.handleChangePasswordCreateRepeat.bind(_this);

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleCreateUser = _this.handleCreateUser.bind(_this);

    _this.setOwnerState = props.setOwnerState;
    return _this;
  }

  _createClass(LoginForm, [{
    key: 'handleChangeUserName',
    value: function handleChangeUserName(event) {
      this.setState({ userName: event.target.value });
    }
  }, {
    key: 'handleChangePassword',
    value: function handleChangePassword(event) {
      this.setState({ password: event.target.value });
    }
  }, {
    key: 'handleChangeUserNameCreate',
    value: function handleChangeUserNameCreate(event) {
      this.setState({ userNameCreate: event.target.value });
    }
  }, {
    key: 'handleChangePasswordCreate',
    value: function handleChangePasswordCreate(event) {
      this.setState({ passwordCreate: event.target.value });
    }
  }, {
    key: 'handleChangePasswordCreateRepeat',
    value: function handleChangePasswordCreateRepeat(event) {
      this.setState({ passwordCreateRepeat: event.target.value });
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
    key: 'handleCreateUser',
    value: function handleCreateUser(event) {

      var requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.state.userNameCreate, password: this.state.passwordCreateRepeat })
      };
      fetch('createUser', requestOptions).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.code == "userOK") {} else if (data.code == "userFailed") {}
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
          { style: divStyle },
          React.createElement(
            'h1',
            null,
            'Login'
          ),
          React.createElement(
            'form',
            { onSubmit: this.handleSubmit },
            React.createElement(
              'label',
              null,
              'UserID'
            ),
            React.createElement('br', null),
            React.createElement('input', { type: 'text', value: this.state.userName, onChange: this.handleChangeUserName }),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement(
              'label',
              null,
              'Password'
            ),
            React.createElement('br', null),
            React.createElement('input', { type: 'password', value: this.state.password, onChange: this.handleChangePassword }),
            React.createElement('br', null),
            React.createElement(
              'button',
              null,
              'Log In'
            )
          )
        ),
        React.createElement(
          'div',
          { style: divStyle },
          React.createElement(
            'h1',
            null,
            'Create Account'
          ),
          React.createElement(
            'form',
            { onSubmit: this.handleCreateUser },
            React.createElement(
              'label',
              null,
              'UserID'
            ),
            React.createElement('br', null),
            React.createElement('input', { type: 'text', value: this.state.userNameCreate, onChange: this.handleChangeUserNameCreate }),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement(
              'label',
              null,
              'Password'
            ),
            React.createElement('br', null),
            React.createElement('input', { type: 'password', value: this.state.passwordCreate, onChange: this.handleChangePasswordCreate }),
            React.createElement('br', null),
            React.createElement(
              'label',
              null,
              'Type Password Again'
            ),
            React.createElement('br', null),
            React.createElement('input', { type: 'password', value: this.state.passwordCreateRepeat, onChange: this.handleChangePasswordCreateRepeat }),
            React.createElement('br', null),
            React.createElement(
              'button',
              null,
              'Create Account'
            )
          )
        )
      );
    }
  }]);

  return LoginForm;
}(React.Component);