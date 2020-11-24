import React, { Component } from "react";
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
    render() {
        return (
            <div>
                {this.props.notes.map((note, index) => {
                    return (
                        <div
                            key={note.id}
                            className={`card shadow rounded-sm d-inline-flex p-2 m-2 ${note.color}`}
                        >
                            <div className="row no-gutters text-dark bg-transparent">
                                <div className="card-header p-1 align-items-center">
                                    {note.date}
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
                            <div className="card-body p-0 m-0">
                                <h5 className="card-title p-1 m-0">
                                    {note.text}
                                </h5>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default SetNotes;
