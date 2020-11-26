import React from "react";
// import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import FormComponent from "./componentes/form";
import SetNotes from "./componentes/notes";
import Modal from "./componentes/PopUpModal";
import archiveModal from "./componentes/archiveModal";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            notesArchive: [],
            noteForModal: {},
            indexForedit: "",
            modalIsOpen: false,
            archivemodalIsOpen: false,
        };
        this.callBackNote = this.callBackNote.bind(this);
        this.getNoteForModal = this.getNoteForModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.callForEdite = this.callForEdite(this);
        this.openArciveModal = this.openModal.bind(this);
        this.closeArciveModal = this.closeModal.bind(this);
    }
    //Happens when Creating new note
    callBackNote = (data) => {
        let newNotes = this.state.notes;
        newNotes.push(data);
        this.setState({ notes: newNotes });
    };
    //Happens when Detele/moving to archive note
    callBackDelete = (index) => {
        this.setState({
            notesArchive: [...this.state.notesArchive, this.state.notes[index]],
        });
        let begining = this.state.notes.slice(0, index);
        let ending = this.state.notes.slice(index + 1);
        this.setState({ notes: [...begining, ...ending] });
    };
    //Happens when Opening Popup modal
    getNoteForModal = (note, index) => {
        this.setState({ noteForModal: note });
        this.setState({ indexForedit: index });
        this.openModal();
    };
    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };
    //Happens when Opening Popup ArciveModal
    getNoteFromArciveModal = (note, index) => {
        this.setState({ noteForModal: note });
        this.setState({ indexForedit: index });
        this.openModal();
    };
    openArciveModal = () => {
        this.setState({ archivemodalIsOpen: true });
    };

    closeArciveModal = () => {
        this.setState({ archivemodalIsOpen: false });
    };

    //Taking the index for editing
    callForEdite(index) {
        this.setState({ indexForedit: index });
    }
    //Happens when When saving an eddited note in the Modal
    editNote = (note) => {
        let newlistNotes = this.state.notes;
        newlistNotes[this.state.indexForedit] = note;
        this.setState({ notes: newlistNotes });
        this.closeModal();
    };
    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentWillMount() {
        localStorage.getItem("notes") &&
            this.setState({
                notes: JSON.parse(localStorage.getItem("notes")),
                isLoafing: false,
            });
        localStorage.getItem("notesArchive") &&
            this.setState({
                notesArchive: JSON.parse(localStorage.getItem("notesArchive")),
                isLoafing: false,
            });
    }
    //Save notes and deldeted note
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem("notes", JSON.stringify(nextState.notes));
        localStorage.setItem("notesdate", JSON.stringify(Date.now()));
        localStorage.setItem(
            "notesArchive",
            JSON.stringify(nextState.notesArchive)
        );
        localStorage.setItem("notesArchivedate", JSON.stringify(Date.now()));
    }

    render() {
        return (
            <div className="container-fluid vh-100 board">
                <img className="" src="/Pictures/board.png" alt="Cork board" />
                <div className="mb-4 row justify-content-center ">
                    <div
                        className="col-4"
                        style={{
                            position: "fix",
                            // width: "180px",
                            height: "180px",
                        }}
                    >
                        <div
                            className="shadow"
                            onClick={() => this.openArciveModal()}
                            style={{
                                background: "#cfc",
                                width: "200px",
                                height: "200px",
                                transform: `rotate(5deg)`,
                                WebkitTransform: `rotate(5deg)`,
                                position: "absolute",
                                left: "18%",
                                zIndex: "-1",
                            }}
                        >
                            Trash
                        </div>
                        <div
                            className="shadow p-3"
                            style={{
                                position: "absolute",
                                background: "#fff",
                                width: "200px",
                                height: "200px",
                                zIndex: "199",
                                top: "3%",
                                left: "35%",
                            }}
                        >
                            <FormComponent
                                edit={false}
                                callback={this.callBackNote}
                            />
                        </div>
                    </div>
                    <div
                        className="shadow"
                        style={{
                            position: "absolute",
                            background: "#ccf",
                            width: "180px",
                            height: "180px",
                            transform: `rotate(-4deg)`,
                            WebkitTransform: `rotate(-4deg)`,
                            left: "52%",
                            top: "2%",
                            zIndex: "-1",
                        }}
                    ></div>

                    <div
                        className="shadow"
                        style={{
                            position: "absolute",
                            background: "#ff7eb9",
                            width: "180px",
                            height: "180px",
                            transform: `rotate(6deg)`,
                            WebkitTransform: `rotate(6deg)`,
                            left: "50%",
                            zIndex: "-1",
                        }}
                    ></div>
                    <div
                        className="shadow"
                        style={{
                            position: "absolute",
                            background: "#fff740",
                            width: "180px",
                            height: "180px",
                            transform: `rotate(14deg)`,
                            WebkitTransform: `rotate(14deg)`,
                            left: "46%",
                            zIndex: "-1",
                        }}
                    ></div>
                </div>
                <div className="position-fixed">
                    {this.state.notes.length > 0 && (
                        <div className="d-flex justify-content-around p-3 mr-4 ml-4">
                            <SetNotes
                                callback={this.callBackDelete}
                                callForEdite={() => this.callForEdite}
                                callbackForModal={this.getNoteForModal}
                                notes={this.state.notes}
                            />
                        </div>
                    )}
                </div>
                <Modal
                    indexForedit={this.state.indexForedit}
                    note={this.state.noteForModal}
                    open={this.state.modalIsOpen}
                    callback={this.closeModal}
                    callbackForEdit={this.editNote}
                ></Modal>
                <archiveModal
                    indexForedit={this.state.indexForedit}
                    notes={this.state.notesArchive}
                    open={this.state.modalIsOpen}
                    callback={this.closeModal}
                    callbackForEdit={this.editNote}
                ></archiveModal>
            </div>
        );
    }
}

export default App;
