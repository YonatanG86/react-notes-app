import React, { Component } from "react";
class SetNotes extends React.Component {
    render() {
        return (
            <div>
                {this.props.notes.map((note) => {
                    return (
                        <div
                            className="bg-info d-inline-flex p-2 m-2"
                            key={note.id}
                        >
                            {note.text}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default SetNotes;
