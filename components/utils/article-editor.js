import React, { Component } from "react";
import dynamic from 'next/dynamic'

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)

import { EditorState, convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";


export default class ArticleEditor extends Component {

    state = {
        editorState: EditorState.createEmpty(),
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
        this.props.onChangeResponse(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };



    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorAK1"

                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={
                        {
                            options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'colorPicker', 'remove', 'history'],
                            inline: {
                                inDropdown: false,
                                className: undefined,
                                component: undefined,
                                dropdownClassName: undefined,
                                options: ['bold', 'italic', 'underline', 'strikethrough'],
                            },
                            blockType: {
                                inDropdown: true,
                                options: ['Normal', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
                                className: undefined,
                                component: undefined,
                                dropdownClassName: undefined,
                            },
                        }
                    }

                    hashtag={{
                        separator: ' ',
                        trigger: '#',
                    }}
                    mention={{
                        separator: ' ',
                        trigger: '@',
                        suggestions: [
                            { text: 'JavaScript', value: 'javascript', url: 'js' },
                            { text: 'Golang', value: 'golang', url: 'go' },
                        ],
                    }}
                />
            </div>
        );
    }
}
