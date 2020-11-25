import React from "react";
import FormComponent from "./form";

const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    zIndex: 1000,
};

const OVERLAY_STYLES = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, .7)",
    zIndex: 1000,
};

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
        };
    }
    willCloseModal(e) {
        this.props.callback();
    }
    willDoNothing(e) {
        e.stopPropagation();
    }
    WillEdit = (note) => {
        this.props.callbackForEdit(note);
    };
    render() {
        const { note, open } = this.props;
        if (!open) return null;

        return (
            <div
                className="bg-secondary"
                style={OVERLAY_STYLES}
                onClick={(e) => this.willCloseModal(e)}
            >
                <div
                    z-index="100"
                    onClick={(e) => this.willDoNothing(e)}
                    style={MODAL_STYLES}
                    key={note.id}
                    className={`card shadow rounded-sm d-inline-flex p-2 m-2 ${note.color}`}
                >
                    <div className="row no-gutters bg-transparent">
                        <div className="h4 p-1 align-items-center">
                            <small>{note.date}</small>
                        </div>
                        <button
                            type="button"
                            className="close ml-2 mb-1"
                            aria-label="Close"
                            onClick={() => this.willCloseModal()}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <FormComponent
                        noteEdit={note}
                        edit={true}
                        indexForEdite={this.props.indexForedit}
                        callback={this.WillEdit}
                    />
                </div>
            </div>
            // document.getElementById("portal")
        );
    }
}
export default Modal;
