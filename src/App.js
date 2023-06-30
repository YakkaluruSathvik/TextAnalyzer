import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';

function App() {
  const [mode,setMode] = useState('light');
  const [alert,setAlert] = useState(null);

  const showAlert = (message,type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
         setAlert(null);
      }, 1500);
    }
    
    const toggleMode = ()=>{
      if(mode === 'light'){
        setMode('dark')
        document.body.style.backgroundColor = '#212121';
        showAlert("Dark Mode is enabled","success");
        document.title = "Text Analyzer - Dark Mode";
      }
      else{
        setMode('light')
        document.body.style.backgroundColor = 'white';
        showAlert("Light Mode is enabled","success");
        document.title = "Text Analyzer - Light Mode";
      }
    }
    
  return (
    <>    
      <Navbar title="Text Analyzer" mode={mode} toggleMode={toggleMode}/>
      <Alert alert={alert}></Alert>
      <div className='container my-3'>
          <TextForm showAlert={showAlert}  placeholder="Type or paste text here.." heading="Enter the text to analyze below" mode={mode}/>                 
      </div>     
    </>
  );
}

export default App;
