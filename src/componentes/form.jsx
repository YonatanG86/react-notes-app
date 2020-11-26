import React from "react";

class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            button: "Add",
            note: "",
            noteTitle: "",
            noteEdit: {},
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
        this.moveData(
            this.state.note,
            this.state.noteTitle,
            new Date(),
            this.props.index
        );
        this.setState({ note: "", noteTitle: "" });
    }

    getRandomColor() {
        const num = Math.floor(Math.random() * 6);
        switch (num) {
            case 1:
                return "#ff7eb9";
            case 2:
                return "#ccf";
            case 3:
                return "#7afcff";
            case 4:
                return "b#feff9c";
            case 5:
                return "#cfc";
            case 6:
                return "#fff";
            default:
                return "#fff740";
        }
    }

    getRandomColorPin() {
        const num = Math.floor(Math.random() * 3);
        switch (num) {
            case 1:
                return "red";
            case 2:
                return "yellow";
            case 3:
                return "blue";
            default:
                return "green";
        }
    }

    getRandomRotate() {
        const num = Math.random() * 8 - 4;
        return num;
    }

    moveData(note, noteTitle, date, index) {
        if (note) {
            let color,
                pin,
                rotate = "";
            if (this.props.noteEdit) {
                color = this.props.noteEdit.color;
                rotate = this.props.noteEdit.rotate;
                pin = this.props.noteEdit.pin;
            } else {
                color = this.getRandomColor();
                rotate = this.getRandomRotate();
                pin = this.getRandomColorPin();
            }
            const newnote = {
                id: date.getTime(),
                text: note,
                title: noteTitle,
                date: date.toUTCString().slice(4, -7),
                color: color,
                rotate: rotate,
                pin: pin,
                forEdite: index,
            };

            this.props.callback(newnote);
        }
    }

    UNSAFE_componentWillMount() {
        this.handelNoteEdite();
    }
    handelNoteEdite() {
        if (this.props.edit) {
            this.setState({
                note: this.props.noteEdit.text,
                noteTitle: this.props.noteEdit.title,
                button: "Save",
            });
        }
    }

    render() {
        const { note, noteTitle } = this.state;
        return (
            <form
                onSubmit={this.handleSubmit}
                className="form-group h-100 pb-2"
            >
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
                <div
                    className="border align-items-stretch "
                    style={{
                        height: "70%",
                    }}
                >
                    <textarea
                        required
                        value={note}
                        type="text"
                        className="form-control h-100 mb-1"
                        placeholder="Your note..."
                        onChange={(event) => this.handleNote(event)}
                    ></textarea>
                    <button type="submit" className="button-green">
                        {this.state.button}
                    </button>
                </div>
                <div></div>
            </form>
        );
    }
}

export default FormComponent;
