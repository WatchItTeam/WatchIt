import React, { Component } from "react";
import propTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import PosterCard from "../components/PosterCard";
import { normalizeMovie } from "../api/APIUtils";
import "../css/MovieInfo.scss";
import "../css/Scroll.scss";
import Scroll from "../components/Scroll";

/**
 * Markup for the main content of the movie details page
 */
class MovieInformation extends Component {
    static propTypes = {
      currentMovie: propTypes.object.isRequired,
    }
    constructor(props) {
      super(props);
      this.index = 0;
      this.state = {
        source: null,
      };
    }
    updateTrailer = () => {
      if (this.props.currentMovie.videos.results.length === 0) {
        this.setState({ source: null });
        return;
      }
      this.setState({ source: `https://www.youtube.com/embed/${this.props.currentMovie.videos.results[this.index].key}` });
    }
    componentDidMount = () => {
      this.updateTrailer();
    }
    scrollRight = () => {
      this.index = (this.index + 1) % this.props.currentMovie.videos.results.length;
      this.updateTrailer();
    }
    scrollLeft = () => {
      this.index = this.index === 0 ? (this.index - 1) +
      this.props.currentMovie.videos.results.length : this.index - 1;
      this.updateTrailer();
    }
    render() {
      let cast;
      if (this.props.currentMovie.credits.cast.length === 0) {
        cast = <div>No cast to show</div>;
      } else {
        this.props.currentMovie.credits.cast =
        this.props.currentMovie.credits.cast.sort((a, b) => a.order - b.order);
        cast = (
          <Scroll arrayLength={this.props.currentMovie.credits.cast.length}>
            {
              this.props.currentMovie.credits.cast.map((person) => {
                if (person.profile_path === null) {
                  return (
                    <div key={person.id}>
                      <div className="no-poster">
                        <FontAwesomeIcon icon="image" />
                      </div>
                      <p>
                        <b className="nameBorder" >{person.name}</b><br /> {person.character}
                      </p>
                    </div>
                  );
                }
                return (
                  <div className="card" key={person.id}>
                    <img className="cast" src={`https://image.tmdb.org/t/p/w200/${person.profile_path}`} alt="cast" />
                    <p>
                      <b className="nameBorder" >{person.name}</b><br /> {person.character}
                    </p>
                  </div>);
              })
            }
          </Scroll>
        );
      }

      let recommendations;
      if (this.props.currentMovie.recommendations.results.length === 0) {
        recommendations = <div className="botPadding">No recommendations to show</div>;
      } else {
        recommendations = (
          <Scroll arrayLength={this.props.currentMovie.recommendations.results.length}>
            {
              this.props.currentMovie.recommendations.results.map((mov) => {
                const movie = normalizeMovie(mov);
                return (
                  <div className="card" key={movie.id}>
                    <PosterCard
                      key={movie.id}
                      id={movie.id}
                      linkTo={`/${(movie.media_type)}/${movie.id}`}
                      title={movie.title}
                      posterPath={movie.poster_path}
                      releaseDate={movie.release_year}
                      mediaType={movie.media_type}
                    />
                  </div>
                );
              })
            }
          </Scroll>
        );
      }
      let trailers;
      if (this.props.currentMovie.videos.results.length === 0) {
        trailers = <div>No trailers to show</div>;
      } else if (this.props.currentMovie.videos.results.length === 1) {
        trailers = (
          <div className="OuterDiv">
            <div className="embed-container">
              <iframe src={this.state.source} frameBorder="0" title={this.state.currentTrailer} allowFullScreen />
            </div>
          </div>
        );
      } else {
        trailers = (
          <div className="OuterDiv">
            <button className="leftbutton scroll-button"><FontAwesomeIcon icon="angle-left" onClick={this.scrollLeft} /></button>
            <div className="embed-container">
              <iframe src={this.state.source} frameBorder="0" title={this.state.currentTrailer} allowFullScreen />
            </div>
            <button className="rightbutton scroll-button"><FontAwesomeIcon icon="angle-right" onClick={this.scrollRight} /></button>
          </div>
        );
      }

      return (
        <div className="movieInfo">
          <h2>Story</h2>
          {this.props.currentMovie.overview}
          <h2>Trailers</h2>
          {trailers}
          <h2>Cast</h2>
          {cast}
          <h2>
            You may also like
          </h2>
          {recommendations}
        </div>
      );
    }
}

export default MovieInformation;
