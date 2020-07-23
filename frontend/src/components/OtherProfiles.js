import React from 'react';
import { withCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import { getUser, currentUser, follow, unfollow } from '../actions';
import { connect } from "react-redux";

class OtherProfile extends React.Component{
    state = {pictures: []}

    componentDidMount(){
        this.props.currentUser(this.props.cookies.get('token', { path: '/' }));
        this.props.getUser(this.props.match.params.id, this.props.cookies.get('token', { path: '/' }))
    }

    follow = () => {
        this.props.follow(this.props.match.params.id, this.props.cookies.get('token', { path: '/' }))
    }

    unfollow = () => {
        this.props.unfollow(this.props.match.params.id, this.props.cookies.get('token', { path: '/' }))
    }

    render() {
        console.log('heil')
        if(!this.props.cookies.get('token', { path: '/' })){
            this.props.history.push('/login')
            return null
        }
        if(!this.props.user){
            return 'Loading'
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
                    {this.props.currentUsere.user_followings && this.props.currentUsere.user_followings.includes(this.props.user.id)? <button onClick={this.unfollow} className='btn btn-danger'>Unfollow</button>: <button onClick={this.follow} className="btn btn-success">Follow</button>}
                    <div className="row">
                    </div>
                </div>
                
            </div>
            
        </div>
        <div className="col-lg-4 order-lg-1 text-center">
            <img src={`http://localhost:8000/${this.props.user.image_url}/`} className="mx-auto img-fluid img-circle d-block" alt="avatar" />
        </div>
        
    </div>
</div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.currentUser, 'uiui')
    return ({
    user: state.otherUser,
    currentUsere: state.currentUser,
})};

export default connect(mapStateToProps, { getUser, currentUser, follow, unfollow })(withRouter(withCookies(OtherProfile)))