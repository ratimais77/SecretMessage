


class SED_Form extends React.Component 
{
    constructor(props) {
      super(props);
      this.state = {secretData: '', 
                    passcode: '', 
                      
                    storedData: [], 
                    
                    secretDataReverse:'', 
                    passcode: ''
                  };
  
      this.handleChangeData = this.handleChangeData.bind(this);
      this.handleChangeDataReverse = this.handleChangeDataReverse.bind(this);

      this.handleChangePasscode = this.handleChangePasscode.bind(this);
      this.handleChangePasscodeReverse = this.handleChangePasscodeReverse.bind(this);

      this.handleEncrypt = this.handleEncrypt.bind(this);
      this.handleDecrypt = this.handleDecrypt.bind(this);

      this.encriptMyStr = this.encriptMyStr.bind(this);
      this.handleTableItemClick = this.handleTableItemClick.bind(this);
    }
  
    componentDidMount() {

              const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
     
                body: JSON.stringify({ method: 'retrieve'})
                };

                fetch('sed_store', requestOptions)
                .then(response => response.json())
                .then((data) => 
                {
                  this.setState({storedData: data.storedData});
                });
    }

    handleChangeData(event) {
      this.setState({secretData: event.target.value});
    }

    handleChangeDataReverse(event) {
      this.setState({secretDataReverse: event.target.value});
    }



    handleChangePasscode(event) {
      this.setState({passcode: event.target.value});
    }

    handleChangePasscodeReverse(event){
      this.setState({passcodeReverse: event.target.value});
    }
  
    encriptMyStr(str, passcode) {
      return CryptoJS.AES.encrypt(str, passcode).toString();
   }

   decryptMyStr(encrStr, passcode){
      let dec = CryptoJS.AES.decrypt(encrStr, passcode);
      return dec.toString(CryptoJS.enc.Utf8);
   }


   handleTableItemClick(idx)
   {
      this.setState({secretDataReverse: this.state.storedData[idx].sm});
   }

   handleDecrypt() {
      console.log("decripting with "+this.state.passcodeReverse);
      let decr = this.decryptMyStr(this.state.secretDataReverse, this.state.passcodeReverse);
      this.setState({secretDataReverse: decr});
   }


   handleEncrypt() {
        if(this.state.secretData.length===0)
          return;

         const requestOptions = {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ method: 'store', secretData: this.encriptMyStr(this.state.secretData, this.state.passcode)})
         };
         fetch('sed_store', requestOptions)
          .then(response => response.json())
          .then((data) => 
          {
              if(data.code=="saved"){

                  this.setState({secretData:'', passcode:''});
              }
              else{
                  
              }   
          });      

      event.preventDefault();
    }

    render() {

      let styles = {
        width: '100%',
        height: '250px',
        backgroundColor: 'green',
        overflowY: 'auto',
      };

      let headerStyle = {
        backgroundColor: 'red',
        border:'1px solid black',
      };

      const header = <thead><tr>
        <th style={headerStyle}>Action</th>
        <th style={headerStyle}>Timestamp</th>
        <th style={headerStyle}>Secret Message</th>
        </tr></thead>;


     const rows = this.state.storedData.map((obj, idx)=>{
            return <tr key={idx}><td><button onClick={this.handleTableItemClick.bind(this, idx)}>{idx}</button></td><td>{obj.ts}</td><td>{obj.sm}</td></tr>;
     });

     const tablero = <table>
                      {header}
                           <tbody>
                           {rows}
                           </tbody>
                      </table>;

      return (
          <div>
          <div>
          <label>Enter Your pass code here (if you forget this pass code you will never see your secret data again)</label><br/>
          <input type="text" value={this.state.passcode} onChange={this.handleChangePasscode} /><br/>
          <label>Enter Your Secret Data Here</label><br/>
          <textarea style={textAreaStyle} resize='none' value={this.state.secretData} onChange={this.handleChangeData} name="Text1" cols="50" rows="10"></textarea><br/>
          <button onClick={this.handleEncrypt}>Encrypt and Store</button><br/>
          <br/>
          <br/>
          <br/>
          <label>Enter Your pass code here (needs to be same as the one used to encript this message)</label><br/>
          <input type="text" value={this.state.passcodeReverse} onChange={this.handleChangePasscodeReverse} /><br/>
          <textarea readOnly style={textAreaStyle} resize='none' value={this.state.secretDataReverse} onChange={this.handleChangeDataReverse} name="Text2" cols="50" rows="10"></textarea><br/>
          <button onClick={this.handleDecrypt}>Decrypt</button>
          <br/>
          
          </div>
          
          <label>Your stored messages</label>

          <div style={styles}>
          {tablero}
          </div>
          </div>
      );
    }
}