class UserViewTop extends React.Component 
{
    constructor(props) {
      super(props);
      this.setOwnerState = props.setOwnerState;
  
      console.log(this.setOwnerState);
      this.state = {loaded: false, activeFeature: 'none'};
      this.data = {};

      this.featureToViewMap = new Map();
      this.featureToViewMap.set('Store Encrypted Data', SED_Form);

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

    onFeature(event, name)
    {
      console.log(name);
      this.setState({activeFeature: name});
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
  
        let disp;
      
      if(this.state.loaded)
      {
        if(this.state.activeFeature == 'none'){
           let feat = this.data.features;
           let featureList =  <div>{ feat.map(feature => (<button onClick={(e)=>this.onFeature(e, feature.name)} key={feature.name}>{feature.name}</button>))}</div>;
            
           disp = <div style={divStyle}>
           <label>Hello User</label><br/>
           {featureList}
           <button onClick={this.onLogOut}>Log Out</button>
           </div>;
        }
        else{

            const CustomForm  = this.featureToViewMap.get(this.state.activeFeature);
        

            disp=<div>
                     <div>
                     <button onClick={(e)=>this.onFeature(e, 'none')}>Back</button>
                     <p>{this.state.activeFeature}</p>
                     </div>
                <div>
                    <CustomForm/>
                </div>
                </div>;

        }
      }
  
      return (<div>
          {disp}
          </div>
      );
    }
}
 