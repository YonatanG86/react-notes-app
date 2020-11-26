import React from "react";
import SetNotes from "./notes";

const MODAL_STYLES = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, .7)",
    zIndex: 1000,
};

class archiveModal extends React.Component {
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
        const { notes, open } = this.props;
        if (!open) return null;

        return (
            <div
                className=""
                style={MODAL_STYLES}
                onClick={(e) => this.willCloseModal(e)}
            >
                <SetNotes notes={notes} />
            </div>
        );
    }
}
export default archiveModal;
