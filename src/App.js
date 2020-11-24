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

    callBackNote = (data) => {
        let newNotes = this.state.notes;
        newNotes.push(data);
        this.setState({ notes: newNotes });
    };

    callBackrDelete = (index) => {
        let begining = this.state.notes.slice(0, index);
        let ending = this.state.notes.slice(index + 1);
        this.setState({ notes: [...begining, ...ending] });
    };

    render() {
        return (
            <div className="container-fluid vh-100">
                <div className="bg-secondary shadow mb-4 row justify-content-center">
                    <div className="col-9 pt-3">
                        <FormComponent callback={this.callBackNote} />
                    </div>
                </div>
                <div>
                    {this.state.notes.length > 0 && (
                        <div className=" bg-light shadow d-flex justify-content-around p-3 mr-4 ml-4">
                            <SetNotes
                                callback={this.callBackrDelete}
                                notes={this.state.notes}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default App;
