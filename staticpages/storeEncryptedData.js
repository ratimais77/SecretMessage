var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SED_Form = function (_React$Component) {
  _inherits(SED_Form, _React$Component);

  function SED_Form(props) {
    _classCallCheck(this, SED_Form);

    var _this = _possibleConstructorReturn(this, (SED_Form.__proto__ || Object.getPrototypeOf(SED_Form)).call(this, props));

    _this.state = _defineProperty({ secretData: '',
      passcode: '',

      storedData: [],

      secretDataReverse: ''
    }, 'passcode', '');

    _this.handleChangeData = _this.handleChangeData.bind(_this);
    _this.handleChangeDataReverse = _this.handleChangeDataReverse.bind(_this);

    _this.handleChangePasscode = _this.handleChangePasscode.bind(_this);
    _this.handleChangePasscodeReverse = _this.handleChangePasscodeReverse.bind(_this);

    _this.handleEncrypt = _this.handleEncrypt.bind(_this);
    _this.handleDecrypt = _this.handleDecrypt.bind(_this);

    _this.encriptMyStr = _this.encriptMyStr.bind(_this);
    _this.handleTableItemClick = _this.handleTableItemClick.bind(_this);
    return _this;
  }

  _createClass(SED_Form, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ method: 'retrieve' })
      };

      fetch('sed_store', requestOptions).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this2.setState({ storedData: data.storedData });
      });
    }
  }, {
    key: 'handleChangeData',
    value: function handleChangeData(event) {
      this.setState({ secretData: event.target.value });
    }
  }, {
    key: 'handleChangeDataReverse',
    value: function handleChangeDataReverse(event) {
      this.setState({ secretDataReverse: event.target.value });
    }
  }, {
    key: 'handleChangePasscode',
    value: function handleChangePasscode(event) {
      this.setState({ passcode: event.target.value });
    }
  }, {
    key: 'handleChangePasscodeReverse',
    value: function handleChangePasscodeReverse(event) {
      this.setState({ passcodeReverse: event.target.value });
    }
  }, {
    key: 'encriptMyStr',
    value: function encriptMyStr(str, passcode) {
      return CryptoJS.AES.encrypt(str, passcode).toString();
    }
  }, {
    key: 'decryptMyStr',
    value: function decryptMyStr(encrStr, passcode) {
      var dec = CryptoJS.AES.decrypt(encrStr, passcode);
      return dec.toString(CryptoJS.enc.Utf8);
    }
  }, {
    key: 'handleTableItemClick',
    value: function handleTableItemClick(idx) {
      this.setState({ secretDataReverse: this.state.storedData[idx].sm });
    }
  }, {
    key: 'handleDecrypt',
    value: function handleDecrypt() {
      console.log("decripting with " + this.state.passcodeReverse);
      var decr = this.decryptMyStr(this.state.secretDataReverse, this.state.passcodeReverse);
      this.setState({ secretDataReverse: decr });
    }
  }, {
    key: 'handleEncrypt',
    value: function handleEncrypt() {
      var _this3 = this;

      if (this.state.secretData.length === 0) return;

      var requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: 'store', secretData: this.encriptMyStr(this.state.secretData, this.state.passcode) })
      };
      fetch('sed_store', requestOptions).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.code == "saved") {

          _this3.setState({ secretData: '', passcode: '' });
        } else {}
      });

      event.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var styles = {
        width: '100%',
        height: '250px',
        backgroundColor: 'green',
        overflowY: 'auto'
      };

      var headerStyle = {
        backgroundColor: 'red',
        border: '1px solid black'
      };

      var header = React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          null,
          React.createElement(
            'th',
            { style: headerStyle },
            'Action'
          ),
          React.createElement(
            'th',
            { style: headerStyle },
            'Timestamp'
          ),
          React.createElement(
            'th',
            { style: headerStyle },
            'Secret Message'
          )
        )
      );

      var rows = this.state.storedData.map(function (obj, idx) {
        return React.createElement(
          'tr',
          { key: idx },
          React.createElement(
            'td',
            null,
            React.createElement(
              'button',
              { onClick: _this4.handleTableItemClick.bind(_this4, idx) },
              idx
            )
          ),
          React.createElement(
            'td',
            null,
            obj.ts
          ),
          React.createElement(
            'td',
            null,
            obj.sm
          )
        );
      });

      var tablero = React.createElement(
        'table',
        null,
        header,
        React.createElement(
          'tbody',
          null,
          rows
        )
      );

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          null,
          React.createElement(
            'label',
            null,
            'Enter Your pass code here (if you forget this pass code you will never see your secret data again)'
          ),
          React.createElement('br', null),
          React.createElement('input', { type: 'text', value: this.state.passcode, onChange: this.handleChangePasscode }),
          React.createElement('br', null),
          React.createElement(
            'label',
            null,
            'Enter Your Secret Data Here'
          ),
          React.createElement('br', null),
          React.createElement('textarea', { style: textAreaStyle, resize: 'none', value: this.state.secretData, onChange: this.handleChangeData, name: 'Text1', cols: '50', rows: '10' }),
          React.createElement('br', null),
          React.createElement(
            'button',
            { onClick: this.handleEncrypt },
            'Encrypt and Store'
          ),
          React.createElement('br', null),
          React.createElement('br', null),
          React.createElement('br', null),
          React.createElement('br', null),
          React.createElement(
            'label',
            null,
            'Enter Your pass code here (needs to be same as the one used to encript this message)'
          ),
          React.createElement('br', null),
          React.createElement('input', { type: 'text', value: this.state.passcodeReverse, onChange: this.handleChangePasscodeReverse }),
          React.createElement('br', null),
          React.createElement('textarea', { readOnly: true, style: textAreaStyle, resize: 'none', value: this.state.secretDataReverse, onChange: this.handleChangeDataReverse, name: 'Text2', cols: '50', rows: '10' }),
          React.createElement('br', null),
          React.createElement(
            'button',
            { onClick: this.handleDecrypt },
            'Decrypt'
          ),
          React.createElement('br', null)
        ),
        React.createElement(
          'label',
          null,
          'Your stored messages'
        ),
        React.createElement(
          'div',
          { style: styles },
          tablero
        )
      );
    }
  }]);

  return SED_Form;
}(React.Component);