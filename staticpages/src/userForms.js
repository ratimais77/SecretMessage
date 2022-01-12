
class MainPage extends React.Component
{
    constructor(props) {
      super(props);
      this.state = {loggedIn: false};
    }
  
  
    setStateByChild(stateObj){
        
        this.setState(stateObj);
    }
    
  
    render() {
  
      let resp;
      if(!this.state.loggedIn)
      {   
          resp = <LoginForm  setOwnerState={this.setStateByChild.bind(this)}/>;
      }
      else
      {
          resp = <UserViewTop setOwnerState={this.setStateByChild.bind(this)}/>;
      }
  
      
      return (
          <div>
            {resp}
        </div>
      );
    }
};
  
  ReactDOM.render(
    <MainPage/>,
    document.getElementById('root')
  );
  