import React from 'react';

const SignUpError = () => {
    return(
        <div>
            <article className="br3 ba b--black-10 w-100 w-50-m w-25-l mw6 shadow-5 center bg-light-red">
                <p className = "b white">This user already exists. Please enter another username and password</p>
            </article>
        </div>
   
    );
}

export default SignUpError