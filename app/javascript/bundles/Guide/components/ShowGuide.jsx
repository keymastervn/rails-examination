import PropTypes from 'prop-types';
import React from 'react';
import StarRatings from 'react-star-ratings';

class ShowGuide extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      comment: '',
      rating: 0
    };

    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleReviewChange(event) {
    this.setState({comment: event.target.value});
  }

  changeRating( newRating, name ) {
    this.setState({
      rating: newRating
    });
  }

  handleFormSubmit(event) {
    if (this.state.rating < 1) return;

    this.props.proceedCreateNewReview(
      this.props.guide.id,
      this.state.rating,
      this.state.comment
    )
    event.preventDefault();
  }

  renderAverageRating() {
    let average = 0;

    if (this.props.reviews.length > 0) {
      let sum = 0;
      this.props.reviews.forEach(e => sum += e.score );
      average = sum / this.props.reviews.length;
    }

    return (
      <StarRatings
        rating={average}
        starRatedColor="red"
        numberOfStars={6}
        starDimension="15px"
        starSpacing="5px"
        name='rating'
      />
    )
  }

  renderReviews() {
    let comp = [];

    if (this.props.reviews.length === 0) return comp;

    [...this.props.reviews].reverse().forEach(e => {
      comp.push(
        <div key={`review-${e.id}`}>
          <small className="card-text">
            {e.comment}
          </small>
          <br />
          <StarRatings
            rating={e.score}
            starRatedColor="red"
            numberOfStars={6}
            starDimension="15px"
            name='rating'
          />
          <hr />
        </div>
      )
    })

    return (
      <div className="col-sm-6">
        <div className="card" style={{height: '14rem', maxHeight: '14rem', overflowY: 'auto'}}>
          <div className="card-header">
            Featured
          </div>
          <div className="card-body">
            <h5 className="card-title">Reviews</h5>
            {comp}
            <a href="#reviewInput" className="btn btn-primary">Add Review</a>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { guide } = this.props;
    return (
      <div className="container pt-4 mb-5">
        <a href={"/guide"}>Click here to go to home page</a>

        <div className="jumbotron">
          <h1>Guide Homepage</h1>
          <hr />
          <div className="row">
            <div className="col-sm-6">
              <p>Please tell guide to be honest and polite to all travelers</p>

              <p> This is <b>{guide.email}</b></p>
              <p> He knows: <b>{guide.display_languages}</b> </p>
              <p> He can: <b>{guide.display_activities}</b> </p>
              <div> His avg rating: &nbsp;&nbsp; {this.renderAverageRating()}</div>
            </div>

            {this.renderReviews()}

          </div>
        </div>

        <h3> He would like to get your appreciation </h3>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="reviewInput">
              Comment
            </label>
            <textarea id="reviewInput" type="text" className="form-control" value={this.state.comment} onChange={this.handleReviewChange} rows="4" />
          </div>

          <div className="form-group">
            <StarRatings
              rating={this.state.rating}
              starRatedColor="blue"
              changeRating={this.changeRating}
              numberOfStars={6}
              starDimension="25px"
              name='rating'
            />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

ShowGuide.propTypes = {
  guide: PropTypes.object.isRequired,
  reviews: PropTypes.array,
};

export default ShowGuide;