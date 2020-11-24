import React from "react";

class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: "",
            noteTitle: "",
        };
        this.handleNote = this.handleNote.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.moveData = this.moveData.bind(this);
    }
    handleNote(event) {
        this.setState({
            note: event.target.value,
        });
    }
    handleNoteTitle(event) {
        this.setState({
            noteTitle: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.moveData(this.state.note, this.state.noteTitle, new Date());
        this.setState({ note: "", noteTitle: "" });
    }

    getRandomColor() {
        const num = Math.floor(Math.random() * 5);
        switch (num) {
            case 1:
                return "bg-success";
            case 2:
                return "bg-danger";
            case 3:
                return "bg-light";
            case 4:
                return "bg-warning";
            default:
                return "bg-primary";
        }
    }

    moveData(note, noteTitle, date) {
        if (note) {
            const newnote = {
                id: date.getTime(),
                text: note,
                title: noteTitle,
                date: date.toUTCString().slice(4, -7),
                color: this.getRandomColor(),
            };

            this.props.callback(newnote);
        }
    }

    render() {
        const { note, noteTitle } = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="form-group">
                <div className="input-group">
                    <input
                        value={noteTitle}
                        type="text"
                        className="input-group rounded mb-2 border
                        "
                        placeholder="Title"
                        onChange={(event) => this.handleNoteTitle(event)}
                    ></input>
                </div>
                <div className="input-group">
                    <textarea
                        value={note}
                        type="text"
                        className="form-control"
                        placeholder="Your note..."
                        onChange={(event) => this.handleNote(event)}
                    ></textarea>
                    <div className="input-group-prepend">
                        <button
                            type="submit"
                            className="btn btn-info rounded-right"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default FormComponent;
