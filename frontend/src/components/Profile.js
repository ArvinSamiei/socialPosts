import React from 'react';
import { withCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import { getUsersFollowing, currentUser, uploadimage} from '../actions';
import { followingChannels} from '../actions';
import { connect } from "react-redux";
import ImageUploader from 'react-images-upload';

class Profile extends React.Component{
    state = {pictures: []}

    componentDidMount(){
        this.props.currentUser(this.props.cookies.get('token'));
        this.props.followingChannels(this.props.cookies.get('token'));
        this.props.getUsersFollowing(this.props.cookies.get('token'))
    }

    onDrop = (picture) => {
        let a = [].concat(picture)
        this.setState({
            pictures: a,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.uploadimage(this.props.cookies.get('token'), this.state.pictures)
    }

    render() {
        if(!this.props.cookies.get('token')){
            this.props.history.push('/login')
            return null
        }
        if(!this.props.user.user){
            console.log(this.props.user)
            return 'Loading'
        }
        return (
            <div className="container">
    <div className="row my-2">
        <div className="col-lg-8 order-lg-2">
           
            <div className="tab-content py-4">
                <div className="tab-pane active" id="profile">
                    <h5 className="mb-3">{this.props.user.user.get_full_name}</h5>
                    <div className="row">
                       
                        
                        <div className="col-md-12">
                            <h5 className="mt-2"><span className="fa fa-clock-o ion-clock float-right"></span> Following Users</h5>
                            <table className="table table-sm table-hover table-striped">
                                <tbody> 
                                    {this.props.usersFollowing? this.props.usersFollowing.map(e => {
                                        return (
                                                <tr key={e.id}>
                                                    <td>
                                                        <img style={{width: 25, height: 25}} src={`http://localhost:8000/${e.image_url}/`} />
                                                        <strong>{e.user.get_full_name}</strong> 
                                                    </td>
                                                </tr>
                                            
                                        )
                                    }): null}
                                
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </div>
        <div className="col-lg-4 order-lg-1 text-center">
            <img src={`http://localhost:8000/${this.props.user.image_url}/`} className="mx-auto img-fluid img-circle d-block" alt="avatar" />
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
    console.log(state, 'oososos')
    return ({
    user: state.currentUser,
    usersFollowing: state.followingUsers,
    channelsFollowing: state.followingChannels
})};

export default connect(mapStateToProps, { getUsersFollowing, followingChannels, currentUser, uploadimage })(withRouter(withCookies(Profile)))