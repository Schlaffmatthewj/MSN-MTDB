import React, { Component } from 'react'
export default class Show extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataLoaded: false,
            imdb_id: this.props.selected.imdb_id,
            title: this.props.selected.title,
            year: this.props.selected.year,
            titleType: this.props.selected.titleType,
            image: this.props.selected.image,
            runTime: this.props.selected.runTime,
            certificate: this.props.selected.certificate,
            ratings: this.props.selected.ratings,
            genres: this.props.selected.genres,
            releaseDate: this.props.selected.releaseDate,
            summary: this.props.selected.summary,
            outline: this.props.selected.outline,
            available_on: this.props.selected.available_on,
            seasons: this.props.selected.season.map(el => el.season),
            episodes: this.props.selected.season.map(el => el.episodes),
        }
    }
    
    componentDidMount() {
        if (this.props.selected) {
            this.setState({
                dataLoaded: true,
            })
        }
    }

    seasonsAndEpisodes() {
        return this.state.seasons.map((el, i) => {
            return (
                <li key={i}>
                    {el}
                    <ul>
                        {this.state.episodes.map(elem => {
                            return elem.map(ele => {
                                if (ele.season === el) {
                                    return (
                                        <li key={ele.id}>Ep: {ele.episode} Title: {ele.title}</li>
                                    )
                                }
                            })
                        })}
                    </ul>
                </li>
            )
        })
    }

    conditionalRender() {
        return (
            <section className="show-page">
                <article>
                    <div>
                        <img alt='Movie/Show Poster' src={(this.props.selected) ? this.state.image : "https://images.pexels.com/photos/3150553/pexels-photo-3150553.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"} width="300px" />
                    </div>
                    <div>
                        <h1>
                            {this.state.title}({this.state.year})
                        </h1>
                        <div>
                            Run Time: {this.state.runTime}
                            Rating: {(this.state.certificate) ? this.state.certificate.US.map(el => el.certificate) : 'Unavailable'}
                            {/* ratingReasons are possible */}
                            Release Date: {this.state.releaseDate}
                            Genres: {this.state.genres.map((el, i) => <span key={i}>{el}</span>)}
                        </div>
                    </div>
                </article>
                <article>
                    <div>
                        <h3>Ratings</h3>
                        <p>{this.state.ratings}</p>
                    </div>
                    <input type="submit" value="Add to watchlist" className="add-watchlist-button" />
                </article>
                <article>
                    <ul>
                        {this.seasonsAndEpisodes()}
                    </ul>
                </article>
                <article>
                    <div>
                        <h3>
                            Summary
                        </h3>
                        {this.state.summary ? <div>
                            {this.state.summary.text}
                            <cite>{this.state.summary.author}</cite>
                        </div> : 'Unavailable'}
                        <div>
                            {(this.state.outline) ? this.state.outline : 'Unavailable'}
                        </div>
                    </div>
                    <div>
                        {this.state.available_on.map(el => {
                            return (
                                <div key={el.id}>
                                    <h3><img src={el.icon} alt="Provider's Icon" /> {el.display_name}</h3>
                                    <a href={el.url} target='_blank'>Watch: {this.state.title} on {el.display_name} NOW!</a>
                                </div>
                            )
                        })}
                    </div>
                </article>
            </section>
        )
    }
    render() {
        return (
            <div>
                {(this.state.dataLoaded) ? this.conditionalRender() : <p>Loading your Results...</p>}
            </div>
        )
    }
}
