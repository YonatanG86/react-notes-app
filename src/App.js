import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import FormComponent from "./componentes/form";
import SetNotes from "./componentes/notes";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
        };
    }

    rNote = (data) => {
        let newNotes = this.state.notes;
        newNotes.push(data);
        this.setState({ notes: newNotes });
    };

    render() {
        console.log(this.state.notes);
        return (
            <div className="container-fluid vh-100">
                <div className="row justify-content-center h-100  ml-5 mr-5 ">
                    <div className="col-3  bg-secondary mr-5 pt-3">
                        <FormComponent callback={this.rNote} />
                    </div>
                    <div className="col  bg-secondary p-2">
                        <SetNotes notes={this.state.notes} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
