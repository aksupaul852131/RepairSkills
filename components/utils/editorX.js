import React, { Component } from "react";

export default class TextEditor extends Component {
    render() {
        return (
            <div className="editorFulPost">


                <textarea
                    id="comment"
                    rows={5}
                    className="p-4 w-full text-sm text-gray-900 border-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    onChange={(e) => this.props.onChangeResponse(e.target.value)}
                />


            </div>
        );
    }
}
