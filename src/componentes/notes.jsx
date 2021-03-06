import React from "react";

class SetNotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClose = this.handleClose.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    handleClose(e, index) {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete your note?")) {
            this.props.callback(index);
        }
    }
    handleEdit = async (note, index) => {
        this.props.callForEdite(index);
        this.props.callbackForModal(note, index);
    };

    render() {
        return (
            <div className="d-box align-content-start">
                {this.props.notes.map((note, index) => {
                    return (
                        <div
                            key={note.id}
                            className={`sticky-note card shadow rounded-sm d-inline-flex p-2 m-2 `}
                            style={{
                                maxWidth: "200px",
                                background: `${note.color}`,
                                transform: `rotate(${note.rotate}deg)`,
                                WebkitTransform: `rotate(${note.rotate}deg)`,
                            }}
                            onClick={() => {
                                this.handleEdit(note, index);
                            }}
                        >
                            <div className="row justify-content-center">
                                <div
                                    className="pin"
                                    style={{
                                        backgroundImage: `radial-gradient(${note.pin} 50%, black 100%)`,
                                    }}
                                ></div>
                            </div>
                            <div className="row no-gutters bg-transparent">
                                <div className=" p-1 align-items-center">
                                    <small>{note.date}</small>
                                </div>
                                <button
                                    id={index}
                                    onClick={(e) => {
                                        this.handleClose(e, index);
                                    }}
                                    type="button"
                                    className="close ml-2 mb-1"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div>
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
