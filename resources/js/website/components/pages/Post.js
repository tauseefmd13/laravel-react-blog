import React from 'react';
import {Link} from "react-router-dom";
import Sidebar from '../partials/Sidebar';
import Comments from '../partials/Comments';
import CommentForm from '../partials/CommentForm';
import PostApi from '../../apis/Post';
import ReactHtmlParser from 'react-html-parser';

class Post extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            post: {},
            spinner: false,
            isLoaded: false
        };
    }

    componentDidMount()
    {
        this.setState({
            spinner: true,
            isLoaded: true
        });

        PostApi.getById(this.props.match.params.id).then(response => this.setState({post: response.data.data, spinner: false, isLoaded: false}));
    }

    componentDidUpdate(prevProps)
    {
        if(this.props != prevProps && this.state.isLoaded == false) {
            this.setState({
                spinner: true,
                isLoaded: true
            });

            PostApi.getById(this.props.match.params.id).then(response => this.setState({post: response.data.data, spinner: false, isLoaded: false}));
        }
    }

    render()
    {
        return (
            <div id="content-wrap">
                <div className="row">
                    <div id="main" className="eight columns">

                        <img src={process.env.MIX_APP_URL + '/assets/website/images/ajax-loader.gif'} style={{display: this.state.spinner==true?'block':'none'}} />

                        {
                            this.state.post.hasOwnProperty('title')?(
                                <article className="entry">

                                    <header className="entry-header">

                                        <h2 className="entry-title">
                                            {this.state.post.title}
                                        </h2>

                                        <div className="entry-meta">
                                            <ul>
                                                <li>{this.state.post.date_formatted}</li>
                                                <span className="meta-sep">•</span>
                                                <li><Link to={`/category/${this.state.post.category.id}/${this.state.post.category.slug}`} title="" rel="category tag">{this.state.post.category.title}</Link></li>
                                                <span className="meta-sep">•</span>
                                                <li>{this.state.post.user.name}</li>
                                            </ul>
                                        </div>

                                    </header>

                                    <div className="entry-content-media">
                                        <div className="post-thumb">
                                            <img src={process.env.MIX_APP_URL + `/uploads/${this.state.post.image}`} />
                                        </div>
                                    </div>

                                    <div className="entry-content">
                                        <p className="lead">{ ReactHtmlParser(this.state.post.content) }</p>
                                    </div>

                                    {
                                        this.state.post.hasOwnProperty('tags') && this.state.post.tags.length > 0? (
                                            <p className="tags">
                                                <span>Tagged in </span>:
                                                {
                                                    this.state.post.tags.map((tag, index) => <span><Link key={tag.id} to={'/tag/' + tag.id + '/' + tag.title}>{tag.title}</Link>{index!=this.state.post.tags.length-1?',':null} </span>)
                                                }
                                            </p>
                                        ) : null
                                    }

                                    <ul className="post-nav group">
                                        {
                                            this.state.post.prev_post != null?(
                                                <li className="prev"><Link rel="prev" to={'/p/' + this.state.post.prev_post.id + '/' + this.state.post.prev_post.slug}><strong>Previous Article</strong> {this.state.post.prev_post.title}</Link></li>
                                            ) : null
                                        }

                                        {
                                            this.state.post.next_post != null?(
                                                <li className="next"><Link rel="next" to={'/p/' + this.state.post.next_post.id + '/' + this.state.post.next_post.slug}><strong>Next Article</strong> {this.state.post.next_post.title}</Link></li>
                                            ) : null
                                        }
                                    </ul>

                                </article>
                            ) : null
                        }


                            <div id="comments">

                                {
                                    this.state.post.hasOwnProperty('approved_comments') && this.state.post.approved_comments.length > 0?(
                                        <div>
                                            <h3>{this.state.post.approved_comments.length} Comments</h3>

                                            <Comments comments={this.state.post.approved_comments} />
                                        </div>
                                        ): null
                                }

                                {
                                    localStorage.getItem('user.api_token') != null?<CommentForm/>:(
                                        <Link to='/login'>Login to comment</Link>
                                    )
                                }


                            </div>



                    </div>

                    <Sidebar/>

                </div>
            </div>
        )
    }
}

export default Post;