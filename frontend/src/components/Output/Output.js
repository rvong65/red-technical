import React from 'react';


const Output = ({userInput, model_output_label, model_output_accuracy}) => {
    return(
        <div className="bg-white center ma4 pa5 br3 w-50 f3 shadow-3 mw8">
            <p>Your text "{userInput}" was classified as <b>{model_output_label}</b> with an accuracy of <b>{model_output_accuracy}%</b> </p>
        </div>

    );
}

export default Output;