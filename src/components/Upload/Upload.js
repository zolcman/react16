import React, { Component,  PropTypes} from 'react'
//import styles from './styles.scss';
import { connect} from 'react-redux';
import {upload} from './UploadActions'


class Upload extends Component {
    constructor(props) {
        super(props)


        this.state = {



        }
    }


    componentDidMount() {

		}
	

addFile(event) {
	var formData = new FormData();
	formData.append("file",event.target.files[0]);
	formData.append('name', 'some value user types');
	formData.append('description', 'some value user types');
	console.log(event.target.files[0]);

	this.props.upload(formData);
}

    render(){

        return (
			<div>
				 <form encType="multipart/form-data" action="">
				<input id="id-for-upload-file" onChange={this.addFile.bind(this)} type="file"/>
				</form>

        </div>)
    }
}
const mapDispatchToProps = function(dispatch) {

    return {

		upload: (file) => dispatch(upload(file)),

    }
}

function mapStateToProps(state) {


    return {


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Upload);
