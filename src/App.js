import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import Property from "./handleApiRequest";
import ReactDOM, {createRoot} from "react-dom/client";
import ParkWidget from "./propertywidget";
import ClipLoader from "react-spinners/ClipLoader";


function App() {
    const [UDRN, setUDRN] = useState(-1);
    const [error, setError] = useState("");

    let [loading, setLoading] = useState(false);

    const property = new Property();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submitted");

        const x = Number(event.target.elements.UDRN.value);
        if (!x){
            setError("Please enter a valid value");
            //display error and to try again
        }else {
            setUDRN(x);
            if (x > -1) {// a value > 0 satisfies valid UDRN number constraints
                console.log(x);
                setLoading(true);
                property.retrievePropertyInfo(x)
                    .then(()=>{ //if data retrieval is successful, then display the data
                            const root = createRoot(document.getElementById('div1'));
                            root.render(<ParkWidget park={property.park}/>);
                        }
                    )
                    .catch(()=>{setError("There was a problem retrieving your data, please try again.")}) //display an error message here
                    .finally(()=>{setLoading(false);}); // Cancel animation here
            }
        }

    };

    return (
    <div className="App">
      <header className="App-header">
        <h1>
            Enter your Unique Property Reference Number
        </h1>
          <form onSubmit={handleSubmit}>
              <input type="number" name="UDRN" placeholder="Enter here"/><br/>
                <input type="submit" value="submit"/>
          </form >
          <p style={{color: "red"}}>{error}</p>
          <ClipLoader
              loading={loading}
              //cssOverride={override}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
          />
          <div id="div1">


          </div>

      </header>


    </div>

  );
}

export default App;
