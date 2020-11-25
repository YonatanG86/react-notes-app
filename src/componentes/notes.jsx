import React from "react";

class SetNotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClose = this.handleClose.bind(this);
    }
    handleClose(index) {
        if (window.confirm("Are you sure you want to delete your note?")) {
            this.props.callback(index);
        }
    }

    getNoteForModal(noteForModal) {
        this.props.callbackForModal(noteForModal);
    }

    render() {
        return (
            <div>
                {this.props.notes.map((note, index) => {
                    return (
                        <div
                            key={note.id}
                            className={`card shadow rounded-sm d-inline-flex p-2 m-2 ${note.color}`}
                        >
                            <div className="row no-gutters bg-transparent">
                                <div
                                    className=" p-1 align-items-center"
                                    onClick={() => {
                                        this.getNoteForModal(note);
                                    }}
                                >
                                    <small>{note.date}</small>
                                </div>
                                <button
                                    id={index}
                                    onClick={() => {
                                        this.handleClose(index);
                                    }}
                                    type="button"
                                    className="close ml-2 mb-1"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div
                                onClick={() => {
                                    this.getNoteForModal(note);
                                }}
                            >
                                <div className="row no-gutters text-dark bg-transparent">
                                    <div className="card-header w-100 p-1 align-items-center font-weight-bold ">
                                        <h4 className="p-0 m-0">
                                            {note.title}
                                        </h4>
                                    </div>
                                </div>

                                <div className="card-body p-0 m-0">
                                    <h5 className="card-title p-1 m-0 font-weight-normal">
                                        {note.text}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default SetNotes;
