import React,{useState} from 'react'

export default function TextForm(props) {
  
  const handleUpClick = ()=>{
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Upper Case!","success");
  }

  const handleLowClick = ()=>{
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lower Case!","success");
  }
  
  const handleCapitalClick = () => {
    let newText = text.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    setText(newText);
    props.showAlert("Converted to Capital Case!","success");
  }
  
  const handleInverseClick = () =>{
    let newText = [...text].map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()).join('');
    setText(newText);
    props.showAlert("Converted to Inverse Case!","success");
  } 

  const handleExtraspaces = ()=>{
    var t = text.split(/[ ]+/);
    setText(t.join(" "));
    props.showAlert("Extra Spaces removed!","success");
  }

  const handleSpecialCharacters=()=> {
    setText(text.replace(/[^a-zA-Z0-9 ]/g, ''));    
    props.showAlert("Special Characters removed!","success");
  }

  const handleExtractNumbers = ()=> {
    const digits = text.match(/[0-9]/g);
    if (digits === null) {
      props.showAlert("Numbers not found!","warning");
    } else {
      setText(digits.join(''));
      props.showAlert("Numbers Extracted!","success");
    }
  }

  const handleExtractText=()=> {
    const letters = text.match(/[a-z]|[A-Z]/g);
    if (letters === null) {
      props.showAlert("Text not found!","warning");
    } else {
      setText(letters.join(''));      
      props.showAlert("Text Extracted!","success");
    }
  }

  const handleExtractLink=()=> {
    const link = text.match(
      /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim
    );
    if (link === null) {
      props.showAlert("Links not found!","warning");
    } else {
      setText(link.join(''));
      props.showAlert("Links Extracted!","success");
    }
  }

  const handleReverseText = ()=> {
    const words = text.split(' ');
    let i = 0;
    let result = '';

    for (i = 0; i < words.length; i++)
      result = words[i].split('').reverse().join('') + ' ' + result;
    
    setText(result.trim());
    props.showAlert("Text Reversed!","success");
  }

  const handleDownloadClick = ()=>{
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', "text_analyzer.txt");    
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();    
      document.body.removeChild(element);
      props.showAlert("File Downloaded!","success");    
  }

  const handleCopy = ()=>{
    navigator.clipboard.writeText(text);
    props.showAlert("Copied to Clipboard!","success");
  }

  const handlePaste = ()=>{    
    navigator.clipboard
    .readText()
    .then((cliptext)=>{
      (setText(text + cliptext));
      props.showAlert("Pasted from Clipboard!","success");
    })
    .catch((err)=>{
      console.log("Something went wrong",err);
      props.showAlert("Something went wrong!","warning");
    });    
  }

  const handleClearClick = ()=>{
    setText("");
    props.showAlert("Text Cleared!","success");
  }

  const handleOnChange = (event)=>{
    setText(event.target.value);    
  }

  const char=(text)=>{
    let modified = text.split("\n");
    let count=0;
    for (let index = 0; index < modified.length; index++) {
      count+=modified[index].length;      
    }
    return count;
  }

  const space=(text)=>{
    let count=0;
    for (let index = 0; index < text.length; index++) {
      if(text[index]===' ')
      count++;      
    }
    return count;
  }

  const charwospace=(text)=>{
    let words = text.split(/\s+/).filter((element)=>{return element.length!==0});
    let count=0;
    for (let index = 0; index < words.length; index++) {
      count+=words[index].length;      
    }
    return count;
  }

  const longest_shortestword=(text)=>{
    let words = text.split(/\s+/).filter((element)=>{return element.length!==0});
    let maximum = null;
    let minimum = Number.MAX_VALUE;
    for (let index = 0; index < words.length; index++) {
      maximum = Math.max(maximum,words[index].length);
      minimum = Math.min(minimum,words[index].length);
    }
    let obj = {maxi:maximum,mini:minimum};
    return obj;
  }

  const avg_length=(text)=>{
    let words = text.split(/\s+/).filter((element)=>{return element.length!==0});
    let avg=0;
    for (let index = 0; index < words.length; index++) {
      avg += words[index].length;
    }
    avg = avg/words.length;
    return Math.round(avg);
  }

  const [text, setText] = useState("");
  return (    
    <>
    <div className='container' style={{color: props.mode==='dark'?'white':'#212121'}}>
        <h1 align='center' className='mb-3' style={{color: props.mode==='dark'?'white':'#002c58'}}>Text Analyzer</h1>
        <p className='description' align='left'>Text Analyzer is an online utility tool which can be used to manipulate your text in the way you want. It also counts the number of characters, words, sentences, and paragraphs present in your text.</p>
        <h3 align='left' className='mb-4 '>{props.heading}</h3>
        <div className="mb-3">        
          <textarea type='text' className="form-control" placeholder={props.placeholder} value= {text} style={{backgroundColor: props.mode==='dark'?'#707070':'white', color: props.mode==='dark'?'white':'black',}} onChange={handleOnChange} id="myBox" rows="8"></textarea>
        </div>
        
        <button disabled={text.length===0} className="btn btn-sm btn-primary mx-1 my-1" onClick={handleUpClick} >UPPER CASE</button>
        <button disabled={text.length===0} className="btn btn-sm btn-primary mx-1 my-1" onClick={handleLowClick} >lower case</button>
        <button disabled={text.length===0} className="btn btn-sm btn-primary mx-1 my-1" onClick={handleCapitalClick} >Capital Case</button>
        <button disabled={text.length===0} className="btn btn-sm btn-primary mx-1 my-1" onClick={handleInverseClick} >InVeRsE CaSe</button>
        <button disabled={text.length===0} className="btn btn-sm btn-primary mx-1 my-1" onClick={handleReverseText} >Reverse Text</button>             
        <button disabled={text.length===0} className="btn btn-sm btn-primary mx-1 my-1" onClick={handleExtraspaces} >Remove Extra Spaces</button>
        <button disabled={text.length===0} className="btn btn-sm btn-primary mx-1 my-1" onClick={handleSpecialCharacters} >Remove Special Characters</button>
        <button disabled={text.length===0} className="btn btn-sm btn-primary mx-1 my-1" onClick={handleExtractNumbers} >Extract Numbers</button>
        <button disabled={text.length===0} className="btn btn-sm btn-primary mx-1 my-1" onClick={handleExtractText} >Extract Text</button>
        <button disabled={text.length===0} className="btn btn-sm btn-primary mx-1 my-1" onClick={handleExtractLink} >Extract Links</button>
        <button disabled={text.length===0} className="btn btn-sm btn-primary mx-1 my-1" onClick={handleDownloadClick} >Download Text</button>
        <button className="btn paste btn-sm btn-warning mx-1 my-1" onClick={handlePaste} >Paste Text</button>
        <button disabled={text.length===0} className="btn btn-sm btn-success mx-1 my-1" onClick={handleCopy} >Copy Text</button>
        <button disabled={text.length===0} className="btn btn-sm btn-danger mx-1 my-1" onClick={handleClearClick} >Clear Text</button>
    </div>
    <br></br>

    <div className="container my-3" style={{color: props.mode==='dark'?'white':'#212121'}}>
      <h2 className="mb-3 text-summary" align='center'>Text Summary</h2>  
      <div className="container mb-3" >
        <table className='text-info-table'>
          <tbody>
            <tr>
              <td>Characters</td>
              <td>{char(text)}</td>
            </tr>
            <tr>
              <td>Characters w/o spaces</td>
              <td>{charwospace(text)}</td>
            </tr>
            <tr>
              <td>Spaces</td>
              <td>{space(text)}</td>
            </tr>
            <tr>
              <td>Punctuations</td>
              <td>{!text.replace(/\s+/g,'').length?0:text.split(".").length-1 + text.split("!").length-1 + text.split("?").length-1}</td>
            </tr>
            <tr>
              <td>Words</td>
              <td>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length}</td>
            </tr>
            <tr>
              <td>Shortest word length</td>
              <td>{(text.length>0 && longest_shortestword(text).mini!==Number.MAX_VALUE)?longest_shortestword(text).mini:0}</td>
            </tr>
            <tr>
              <td>Longest word length</td>
              <td>{(text.length>0 && longest_shortestword(text).maxi!==null)?longest_shortestword(text).maxi:0}</td>
            </tr>
            <tr>
              <td>Average word length</td>
              <td>{(text.length>0 && isNaN(avg_length(text))!==true)?avg_length(text):0}</td>
            </tr>
            <tr>
              <td>Sentences</td>
              <td>{!text.replace(/\s+/g,'').length?0:text.split(".").filter((element)=>{return element.length!==0}).length + text.split("!").length-1 + text.split("?").length-1}</td>
            </tr>
            <tr>
              <td>Paragraphs</td>
              <td>{text.split("\n").filter((element)=>{return element.length!==0}).length}</td>
            </tr>
            <tr>
              <td>Minutes read</td>
              <td>{Math.round((((0.008*(text.split(/\s+/).filter((element)=>{return element.length!==0}).length))*60)/60))}:{Math.round((((0.008*(text.split(/\s+/).filter((element)=>{return element.length!==0}).length))*60)%60))}</td>
            </tr>
          </tbody>
        </table>        
      </div>
      
      <br></br>
      <h2 className='preview'>Preview</h2>
      <p className='preview-text'>{text.length>0?text:"Type or paste something to preview."}</p>
      <br />
      <br />
      <br />
      <div className='container my-3' align='center'>
        <h4 className="mb-3">Contact Us</h4>
        <a class="btn btn-primary" href="mailto:yakkalurusathvik1@gmail.com" role="button"><i class="fa-sharp fa-solid fa-paper-plane mx-1"></i> Send Mail</a>
      </div>
      <div className='container my-3' align='center'>
        <a className="btn mb-3" href="https://www.linkedin.com/in/yakkaluru-sathvik-04b53a213/" target='_blank' role="button" rel="noreferrer"><i style={{color: props.mode==='dark'?'white':'#212121'}} class="icon fa-brands fa-linkedin fa-2x"></i></a>
        <a className="btn mb-3" href="https://github.com/YakkaluruSathvik" target='_blank' role="button" rel="noreferrer"><i style={{color: props.mode==='dark'?'white':'#212121'}} class="icon fa-brands fa-github fa-2x"></i></a>
      </div>
      <br />
      <p align='center'>Copyright © 2023. Yakkaluru Sathvik. All rights reserved. </p>
    </div>    
  </>    
  )
}