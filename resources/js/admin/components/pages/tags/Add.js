import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

// partials
import Breadcrumb from '../../partials/Breadcrumb';
import TagForm from './TagForm';

// actions
import {addTag, setTagDefaults, handleTagTitle} from '../../../store/actions/TagActions';


class Add extends React.Component
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

        this.props.handleTitleChange('');
    }

    handleChange(e) {
        e.preventDefault();

        this.props.handleTitleChange(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        let self = this;

        this.props.addTag(this.props.tag.tag.title, function () {

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
                        Add tag
                    </h1>

                    <Breadcrumb />

                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-warning">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Add tag</h3>

                                    <Link to='/tags' className="btn btn-warning btn-sm pull-right"><i className="fa fa-arrow-left"></i> Return back</Link>
                                </div>
                                <form role="form" method="post" onSubmit={this.handleSubmit}>

                                    <TagForm tag={this.props.tag} onchange={this.handleChange}/>

                                    <div className="box-footer">
                                        <button type="submit" className="btn btn-success">Submit</button>
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
        setTagDefaults: () => dispatch(setTagDefaults()),
        handleTitleChange: (title) => dispatch(handleTagTitle(title)),
        addTag: (title, cb) => dispatch(addTag(title, cb))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);