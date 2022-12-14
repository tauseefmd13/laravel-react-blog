import React from 'react';
import {connect} from 'react-redux';
import {
    addTag, setTagDefaults, handleTagTitle,
    listAllTags
} from '../../../store/actions/TagActions';
import TagForm from './TagForm';


class AddModal extends React.Component
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

            setTimeout(() => {
                // close modal
                self.props.close_modal();

                // reset defaults
                self.props.setTagDefaults();

                // refetch tags
                self.props.listAllTags();

            }, 2000);
        });
    }

    render()
    {
        return (
            <div className={`modal fade` + (this.props.show_modal==true?' in':'')} style={{display: (this.props.show_modal==true?'block':'none')}} id="modal-default">
                <div className="modal-dialog">
                    <form role="form" method="post" onSubmit={this.handleSubmit}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" aria-label="Close" onClick={this.props.close_modal}>
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Add new tag</h4>
                            </div>
                            <div className="modal-body">
                                <TagForm tag={this.props.tag} onchange={this.handleChange}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" onClick={this.props.close_modal}>Close</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        tag: state.tag
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleTitleChange: (title) => dispatch(handleTagTitle(title)),
        addTag: (title, cb) => dispatch(addTag(title, cb)),
        setTagDefaults: () => dispatch(setTagDefaults()),
        listAllTags: () => dispatch(listAllTags()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);