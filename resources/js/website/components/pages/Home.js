import React from 'react';
import Sidebar from '../partials/Sidebar';
import Article from '../partials/Article';
import Post from '../../apis/Post';

class Home extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
          posts: [],
          spinner: false
        };
    }

    componentDidMount()
    {
        this.setState({
            spinner: true
        });

        Post.getRecent().then(response => {
            this.setState({
                posts: response.data.data,
                spinner: false
            });
        });
    }

    render()
    {
        return (
            <div id="content-wrap">
                <div className="row">

                    <div id="main" className="eight columns">

                        <img src={process.env.MIX_APP_URL + '/assets/website/images/ajax-loader.gif'} style={{display: this.state.spinner==true?'block':'none'}} />
                        {
                            this.state.posts.map(post => <Article key={post.id} post={post} />)
                        }

                    </div>

                    <Sidebar/>

                </div>
            </div>
        )
    }
}

export default Home;