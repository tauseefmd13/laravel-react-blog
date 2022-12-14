import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost } from '../../../store/actions/PostActions';

class Row extends React.Component {

    constructor(props)
    {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e) {
        e.preventDefault();

        if(confirm("Are you sure?")) {
            this.props.deletePost(this.props.post.id);
        }
    }

    render()
    {
        return (
            <tr>
                <td>{this.props.post.id}</td>
                <td>{this.props.post.title}</td>
                <td>
                    <img src={this.props.post.image_url} width="50" height="40" />
                </td>
                <td>
                    {this.props.post.published == 1?(<span className="badge bg-green">published</span>):(<span className="badge bg-gray">draft</span>)}
                </td>
                <td>{this.props.post.category?this.props.post.category.title:""}</td>
                <td>{this.props.post.user?this.props.post.user.name:""}</td>
                <td>
                    <Link to={'/posts/edit/' + this.props.post.id} className="btn btn-info btn-sm"><i
                        className="fa fa-edit"></i></Link>
                    <a href="#" className="btn btn-danger btn-sm" onClick={this.handleDelete}><i
                        className="fa fa-remove"></i></a>
                </td>
            </tr>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deletePost: (id) => dispatch(deletePost(id))
    }
};

export default connect(null, mapDispatchToProps)(Row);