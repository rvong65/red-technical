import React from 'react';

const Input = ({userInputChange, submitUserInput}) => {
    return(
        <div>
            <div className="br3 center flex ba b--black-10  mt7 w-100 w-30-ns w-50-m w-50-l mw8 pa4 bg-dark-blue">
                <input className= "userInput br3 pa2 w-100 mw8" placeholder="Type in something" type = "text" onChange={userInputChange}></input>
                <input className="br3 grow pv2 input-reset pointer white bg-gold" type="submit" value="Send" onClick={submitUserInput}></input>
            </div>
        </div>
    );
}

export default Input;

