import React from 'react'; 

const Navigation = ({onChangeRoute, isSignedIn}) => {
    return(
        <div>
            <nav className="di">
                <h1 style={{position: "absolute", left: 30, top: 30, fontWeight:"bold", color:"white"}} >Sentiment Classification</h1>
                {isSignedIn === true &&
                <p style = {{right: 6, top: 14}} className = 'absolute f4 link b pa3 pointer white no-underline underline-hover' onClick={ () => onChangeRoute("signOut")}>Sign Out</p>}
            </nav>
        </div>
    );
}

export default Navigation;