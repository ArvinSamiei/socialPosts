import React from 'react';
import { withCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import { uploadChannelImage, getChannel} from '../actions';
import { connect } from "react-redux";
import ImageUploader from 'react-images-upload';

class Profile extends React.Component{
    state = {pictures: []}

    componentDidMount(){
        this.props.getChannel(this.props.match.params.id, this.props.cookies.get('token'))
    }

    onDrop = (picture) => {
        let a = [].concat(picture)
        this.setState({
            pictures: a,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.uploadChannelImage(this.props.match.params.id, this.props.cookies.get('token', { path: '/' }), this.state.pictures)
    }


    render() {
        console.log('heil')
        if(!this.props.cookies.get('token')){
            this.props.history.push('/login')
            return null
        }
        if(!this.props.channel){
            return 'Loading'
        }
        return (
            <div className="container">
    <div className="row my-2">
        <div className="col-lg-8 order-lg-2">
           
            <div className="tab-content py-4">
                <div className="tab-pane active" id="profile">
                    <h5 className="mb-3">{this.props.channel.name}</h5>
                    <div className="row">
                    </div>
                </div>
                
                
            </div>
        </div>
        <div className="col-lg-4 order-lg-1 text-center">
            <img src={`http://localhost:8000/${this.props.channel.image_url}/`} className="mx-auto img-fluid img-circle d-block" alt="avatar" />
            <label className="custom-file">
                <form onSubmit={this.handleSubmit}>
                    <ImageUploader
                        withIcon={false}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        singleImage={true}
                    />
                    <button type='submit' className='btn btn-primary' >Change Photo</button>
                </form>
            
            </label>
        </div>
    </div>
</div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state, 'channel component state')
    return ({
    channel: state.channel,
})};

export default connect(mapStateToProps, { uploadChannelImage, getChannel })(withRouter(withCookies(Profile)))