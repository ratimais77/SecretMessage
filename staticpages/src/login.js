


class LoginForm extends React.Component 
{
    constructor(props) {
      super(props);
      this.state = {userName: 'rati',
                    password: 'pass',
                    
                    userNameCreate:'',
                    passwordCreate:'',
                    passwordCreateRepeat:''}
  
      this.handleChangeUserName = this.handleChangeUserName.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      
      this.handleChangeUserNameCreate = this.handleChangeUserNameCreate.bind(this);
      this.handleChangePasswordCreate = this.handleChangePasswordCreate.bind(this);
      this.handleChangePasswordCreateRepeat = this.handleChangePasswordCreateRepeat.bind(this);
      
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleCreateUser = this.handleCreateUser.bind(this);
  
      this.setOwnerState = props.setOwnerState;
    }
  
    handleChangeUserName(event) {
      this.setState({userName: event.target.value});
    }
    handleChangePassword(event) {
      this.setState({password: event.target.value});
    }
  
    handleChangeUserNameCreate(event){
      this.setState({userNameCreate: event.target.value});
    }
  
    handleChangePasswordCreate(event) {
      this.setState({ passwordCreate: event.target.value});
    }
  
    handleChangePasswordCreateRepeat(event) {
      this.setState({passwordCreateRepeat: event.target.value});
    }
  
    handleSubmit(event) {
  
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.state.userName, password:  this.state.password})
      };
      fetch('login', requestOptions)
          .then(response => response.json())
          .then((data) => 
          {
              if(data.code=="loginOK"){
                  this.setState({ loggedIn: true });
                  this.setOwnerState({loggedIn: true});
              }
              else if(data.code=="loginFailed"){
                  this.setState({ loggedIn: false });
                  this.setOwnerState({loggedIn: false});
              }
          });
          
      event.preventDefault();
    }
  
    handleCreateUser(event) {
  
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.state.userNameCreate, password:  this.state.passwordCreateRepeat})
      };
      fetch('createUser', requestOptions)
          .then(response => response.json())
          .then((data) => 
          {
              if(data.code=="userOK"){
                
              }
              else if(data.code=="userFailed"){
                  
              }
          });
          
      event.preventDefault();
    }
  
    render() {
      return (
          <div>
        <div style={divStyle}>
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
          <label>UserID</label><br/>
          <input type="text" value={this.state.userName} onChange={this.handleChangeUserName} /><br/>
          <br/>
          <label>Password</label><br/>  
          <input type="password" value={this.state.password} onChange={this.handleChangePassword} /><br/>
          <button>Log In</button>
        </form>
        </div>
        <div style={divStyle}>
        <h1>Create Account</h1>
        <form onSubmit={this.handleCreateUser}>
          <label>UserID</label><br/>
          <input type="text" value={this.state.userNameCreate} onChange={this.handleChangeUserNameCreate} /><br/>
          <br/>
          <label>Password</label><br/>  
          <input type="password" value={this.state.passwordCreate} onChange={this.handleChangePasswordCreate} /><br/>
          <label>Type Password Again</label><br/>  
          <input type="password" value={this.state.passwordCreateRepeat} onChange={this.handleChangePasswordCreateRepeat} /><br/>
          <button>Create Account</button>
        </form>
        </div>
        </div>
  
      );
    }
}