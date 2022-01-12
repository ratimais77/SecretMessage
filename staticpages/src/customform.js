class UserViewTop extends React.Component 
{
    constructor(props) {
      super(props);
      this.setOwnerState = props.setOwnerState;
  
      console.log(this.setOwnerState);
      this.state = {loaded: false};
      this.data = {};
  
      this.onLogOut=this.onLogOut.bind(this);
    }
  
    onLogOut(event)
    {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
      };
      fetch('logout', requestOptions)
          .then(response => response.json())
          .then((data) => 
          {
              if(data.code=="loggedOut"){
                  console.log(data);
                   this.setOwnerState({loggedIn: false});
              }
          });
    }
  
    componentDidMount() {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.state.userName, password:  this.state.password})
      };
      fetch('getUserInfo', requestOptions)
          .then(response => response.json())
          .then((data) => 
          {
            
              if(data.code=="userInfo"){
                   this.data = data;
                   this.setState({loaded:true});
                   console.log(this.data );
              }
          });
    }
    render() {
  
      let featureList;
      if(this.state.loaded)
      {
  
          let feat = this.data.features;
  
           featureList =  <div>{ feat.map(feature => (<p key={feature.name}>{feature.name}</p>))}</div>;
      }
  
      return (
          <div style={divStyle}>
          <label>Hello User</label><br/>
          {featureList}
          <button onClick={this.onLogOut}>Log Out</button>
          </div>
      );
    }
}
 