import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

// partials
import Breadcrumb from '../../partials/Breadcrumb';
import TagForm from './TagForm';

// actions
import {showTag, setTagDefaults, handleTagTitle, editTag} from '../../../store/actions/TagActions';


class Edit extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
        this.props.setTagDefaults();

        this.props.showTag(this.props.match.params.id);
    }

    handleChange(e) {
        e.preventDefault();

        this.props.handleTitleChange(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        let self = this;

        this.props.editTag(this.props.tag.tag.title,
            this.props.match.params.id, function () {

                // reset title
                self.props.handleTitleChange('');

                // redirect
                setTimeout(() => self.props.history.push('/tags'), 2000);
            });
    }


    render()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Edit tag
                    </h1>

                    <Breadcrumb />

                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-warning">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Edit tag #{ this.props.match.params.id }</h3>

                                    <Link to='/tags' className="btn btn-warning btn-sm pull-right"><i className="fa fa-arrow-left"></i> Return back</Link>
                                </div>
                                <form role="form" method="post" onSubmit={this.handleSubmit}>

                                    <TagForm tag={this.props.tag} onchange={this.handleChange}/>

                                    <div className="box-footer">
                                        <button type="submit" className="btn btn-success">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        tag: state.tag
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showTag: (id) => dispatch(showTag(id)),
        handleTitleChange: (title) => dispatch(handleTagTitle(title)),
        editTag: (title, id, cb) => dispatch(editTag(title, id, cb)),
        setTagDefaults: () => dispatch(setTagDefaults())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);