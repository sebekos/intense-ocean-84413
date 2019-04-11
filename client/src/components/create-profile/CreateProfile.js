import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import {createProfile} from '../../actions/profileActions';

class CreateProfile extends Component {
    state = {
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            this.setState({errors:nextProps.errors})
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
          };

          this.props.createProfile(profileData, this.props.history);
    }

    render() {
        const { errors, displaySocialInputs } = this.state;

        let socialInputsContent, socialMedia, socialMediaCap;

        if (displaySocialInputs) {
            // simply push-pop array to manage social media links
            socialMedia = ["twitter", "facebook", "youtube", "instagram", "linkedin"];
       
            socialInputsContent = socialMedia.map(sm => {
              // to captilize first character of each social media inside loop!
              socialMediaCap = sm.charAt(0).toUpperCase() + sm.slice(1);
              return (
                <div key={sm}>
                  <InputGroup
                    placeholder={`${socialMediaCap} Profile`}
                    name={sm}
                    icon={`fab fa-${sm}`}
                    value={this.state[sm]}
                    onChange={(e) => { this.onChangeHandler(e) }}
                    error={errors.sm}
                  />
                </div>
              );
            });
          }

        //Select Options for status
        const options = [
            { label: '* Select Professional Status', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student or Learning', value: 'Student or Learning' },
            { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' }
        ];

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">Let's get some information to make your profile stand out</p>
                            <small className="d-block pb-3"> * = requried fields </small>
                            <form onSubmit={(e) => { this.onSubmitHandler(e) }}>
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={(e) => { this.onChangeHandler(e) }}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. Your full name, company name, nickname"
                                />
                                <SelectListGroup
                                    placeholder="Status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={(e) => { this.onChangeHandler(e) }}
                                    error={errors.status}
                                    options={options}
                                    info="Give us an idea of where you are at in your career"
                                />
                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={(e) => { this.onChangeHandler(e) }}
                                    error={errors.company}
                                    info="Could be your own company or one you work for"
                                />
                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={(e) => { this.onChangeHandler(e) }}
                                    error={errors.website}
                                    info="Could be your own website or a company one"
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={(e) => { this.onChangeHandler(e) }}
                                    error={errors.location}
                                    info="City or city & state suggested (eg. Boston, MA)"
                                />
                                <TextFieldGroup
                                    placeholder="* Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={(e) => { this.onChangeHandler(e) }}
                                    error={errors.skills}
                                    info="Please use comma separated values (eg.
                                        HTML,CSS,JavaScript,PHP"
                                />
                                <TextFieldGroup
                                    placeholder="Github Username"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={(e) => { this.onChangeHandler(e) }}
                                    error={errors.githubusername}
                                    info="If you want your latest repos and a Github link, include your username"
                                />
                                <TextAreaFieldGroup
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={(e) => { this.onChangeHandler(e) }}
                                    error={errors.bio}
                                    info="Tell us a little about yourself"
                                />
                                <div className="mb-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                    this.setState(prevState => ({
                                        displaySocialInputs: !prevState.displaySocialInputs
                                    }));
                                    }}
                                    className="btn btn-light">
                                    Add Social Network Links 
                                    <span className="text-muted"> Optional</span>
                                </button>
                                {socialInputsContent}
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));
