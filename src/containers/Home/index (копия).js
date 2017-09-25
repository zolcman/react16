/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
//import UserList from '../../components/UserList';
import Calendar from '../../components/Calendar/Calendar';
import styles from './styles.scss';
import draftToHtml from 'draftjs-to-html';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw  } from 'draft-js';
import './react-draft-wysiwyg.scss';



// Export this for unit testing more easily
export class Home extends PureComponent {

  constructor(props) {
      super(props);
      this.state = {
        editorState: EditorState.createEmpty(),
      };
    }


  componentDidMount() {

  }

  onEditorStateChange: Function = (editorState) => {
      this.setState({
        editorState,
      });
    };

    getContent() {
      console.log(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
    }

    uploadImageCallBack(file) {

    var accessToken = sessionStorage.getItem('accessToken');
    console.log(accessToken);
    return new Promise(
     (resolve, reject) => {
       const xhr = new XMLHttpRequest();
       xhr.open('POST', 'https://dev.hylaa.net/oa/file/upload');
     // xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    //    xhr.setRequestHeader('Content-type', 'multipart/form-data');
       const data = new FormData();
       data.append('folder', 'html')
       data.append('permission', 0)
       data.append("file", file, file.name)

       console.log(file);


       xhr.send(data);

       xhr.addEventListener('load', () => {
         console.log(JSON.parse(xhr.response));
         const response = JSON.parse(xhr.responseText);
         var ddd = '';
         console.log(response.body.url);
        resolve({ data: { link: response.body.url } });
       });
       xhr.addEventListener('error', () => {
         const error = JSON.parse(xhr.responseText);
        reject(error);
      });
     }
    );
    }



  render() {
    const { editorState } = this.state;
    return (
      <div className="">
        <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={this.onEditorStateChange}

        toolbar={{
      inline: { inDropdown: true },
      list: { inDropdown: true },
      textAlign: { inDropdown: true },
      link: { inDropdown: true },
      history: { inDropdown: true },
      image: { uploadCallback: this.uploadImageCallBack.bind(this), alt: { present: true, mandatory: false } },
    }}
      />
      <a onClick={this.getContent.bind(this)}>ssss</a>

      </div>
    );
  }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(Home);
