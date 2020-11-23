import React from "react";

class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: "",
        };
        this.handleNote = this.handleNote.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.moveData = this.moveData.bind(this);
    }
    handleNote(event) {
        this.setState({ note: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.moveData(this.state.note, new Date());
        this.setState({ note: "" });
    }

    moveData(note, date) {
        const newnote = {
            id: date.getMilliseconds(),
            text: note,
            date: date,
        };
        this.props.callback(newnote);
    }

    render() {
        const { note } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea
                    type="text"
                    className="form-control"
                    placeholder="Your note..."
                    value={note}
                    onChange={(event) => this.handleNote(event)}
                ></textarea>
                <button type="submit" className="btn btn-info btn-block">
                    Add
                </button>
            </form>
        );
    }
}

export default FormComponent;
