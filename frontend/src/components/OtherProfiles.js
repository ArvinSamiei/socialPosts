import React from 'react';
import { withCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import { getUser} from '../actions';
import { connect } from "react-redux";

class Profile extends React.Component{
    state = {pictures: []}

    componentDidMount(){
        this.props.getUser(this.props.match.params.id, this.props.cookies.get('token'))
    }


    render() {
        console.log('heil')
        if(!this.props.cookies.get('token')){
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
    console.log(state, 'oosososooooooooooooooooooooooooooooooo')
    return ({
    user: state.otherUser,
})};

export default connect(mapStateToProps, { getUser })(withRouter(withCookies(Profile)))