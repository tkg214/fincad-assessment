import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import Header from './Header';
import PostList from '../components/PostList';
import NewPost from './NewPost';
import { fetchAllPosts } from '../actions/posts';

class App extends Component {
  componentWillMount() {
    this.props.fetchAllPosts();
  }

  render() {
    return (
      <div>
        <Header />
        <Grid>
          <Row>
            <Col md={8}>
              <NewPost />
              {this.props.posts.isFetched &&
                <PostList list={this.props.posts.list} />}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

const mapDispatchToProps = dispatch => ({
  fetchAllPosts: () => {
    dispatch(fetchAllPosts());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
