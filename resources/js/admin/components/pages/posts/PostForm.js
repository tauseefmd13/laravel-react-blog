import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic/build/ckeditor";
import { Link } from 'react-router-dom';

import Spinner from '../../partials/Spinner';
import SuccessAlert from '../../partials/SuccessAlert';
import ErrorAlert from '../../partials/ErrorAlert';

class Form extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div>
                <Spinner show={this.props.create_update_spinner}/>
                <SuccessAlert msg={this.props.success_message}/>
                <ErrorAlert msg={this.props.error_message}/>

                <div className="col-md-8">
                    <div className="box box-warning">
                        <div className="box-header with-border">
                            <h3 className="box-title">{this.props.post.id!=""?'Edit post #'+this.props.post.id:'Add post'}</h3>

                            <Link to='/posts' className="btn btn-warning btn-sm pull-right"><i className="fa fa-arrow-left"></i> Return back</Link>
                        </div>
                        <div className="box-body">
                            <div className={`form-group ${this.props.validation_errors.title?'has-error':''}`}>
                                <label>Post title</label>
                                <input type="text" className="form-control" placeholder="Post title" onChange={this.props.handleFieldChange} value={this.props.post.title?this.props.post.title:''} name="title" />
                                {
                                    this.props.validation_errors.title!=null?(<div className="help-block">{this.props.validation_errors.title[0]}</div>):null
                                }
                            </div>
                            <div className={`form-group ${this.props.validation_errors.content?'has-error':''}`}>
                                <label>Content</label>
                                <CKEditor
                                    name="content"
                                    editor={ ClassicEditor }
                                    data={this.props.post.content?this.props.post.content:''}
                                    onInit={(editor) => { editor.setData(this.props.post.content?this.props.post.content:'') }}
                                    onChange={this.props.handleCkeditorChange}
                                />
                                {
                                    this.props.validation_errors.content!=null?(<div className="help-block">{this.props.validation_errors.content[0]}</div>):null
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="box box-success">
                        <div className="box-body">
                            <div className={`input-group input-group-sm ${this.props.validation_errors.category_id?'has-error':''}`}>
                                <select name="category_id" id="category_id" className="form-control" onChange={this.props.handleFieldChange} value={this.props.post.category_id}>
                                    <option value="">select category</option>
                                    {
                                        this.props.all_categories.map(cat => {
                                            return (
                                                <option key={cat.id} value={cat.id}>{cat.title}</option>
                                            )
                                        })
                                    }
                                </select>
                                <span className="input-group-btn">
                                      <button type="button" className="btn btn-info btn-flat" onClick={this.props.openAddCategoryModal.bind(this)}><i className="fa fa-plus"></i> Add new category</button>
                                </span>
                            </div>
                            {
                                this.props.validation_errors.category_id!=null?(<div className="help-block">{this.props.validation_errors.category_id[0]}</div>):null
                            }
                            <br/>
                            <div className="form-group">
                                <label>Tags</label>
                                <div>
                                    {
                                        this.props.all_tags.map(tag => {
                                            return (
                                                <div className="checkbox" key={tag.id}>
                                                    <label>
                                                        <input type="checkbox" name="tag[]" value={tag.id} onChange={this.props.handleFieldChange} checked={this.props.post.tags.includes(tag.id)} />
                                                        { tag.title }
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <button type="button" className="btn btn-info btn-flat" onClick={this.props.openAddTagModal.bind(this)}><i className="fa fa-plus"></i> Add new tag</button>
                            </div>
                            {
                                this.props.post.image_url?(
                                    <img src={this.props.post.image_url} width="100" height="80" />
                                ): null
                            }
                            <div className={`form-group ${this.props.validation_errors.image?'has-error':''}`}>
                                <label>Image</label>
                                <input type="file" name="image" id="image" className="form-control" onChange={this.props.handleFieldChange} accept="image/*" />
                                {
                                    this.props.validation_errors.image!=null?(<div className="help-block">{this.props.validation_errors.image[0]}</div>):null
                                }
                            </div>

                            <div className="row">
                                <div className="col-md-6"><input type="button" name="publish" value="Publish" onClick={this.props.handleSave} className="btn btn-success" /></div>
                                <div className="col-md-6"><input type="button" name="savedraft" value="Save draft" onClick={this.props.handleSave} className="btn btn-default pull-right" /></div>
                                <input type="submit" ref={this.props.submitRef} style={{display: 'none'}} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Form;