import React from "react";
// import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import FormComponent from "./componentes/form";
import SetNotes from "./componentes/notes";
import Modal from "./componentes/PopUpModal";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            noteForModal: {},
            modalIsOpen: false,
        };
        this.getNoteForModal = this.getNoteForModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    callBackNote = (data) => {
        let newNotes = this.state.notes;
        newNotes.push(data);
        this.setState({ notes: newNotes });
    };

    callBackDelete = (index) => {
        let begining = this.state.notes.slice(0, index);
        let ending = this.state.notes.slice(index + 1);
        this.setState({ notes: [...begining, ...ending] });
    };

    getNoteForModal(note) {
        this.setState({ noteForModal: note });
        this.openModal();
    }
    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

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
                                callback={this.callBackDelete}
                                callbackForModal={this.getNoteForModal}
                                notes={this.state.notes}
                            />
                        </div>
                    )}
                </div>
                <Modal
                    note={this.state.noteForModal}
                    open={this.state.modalIsOpen}
                    callback={this.closeModal}
                ></Modal>
            </div>
        );
    }
}

export default App;
