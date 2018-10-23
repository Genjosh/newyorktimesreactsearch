var React = require("react");

var Form = require("./children/Main");
var Results = require("./children/Searched");
var History = require("./children/Saved");

var helpers = require("./utils/helpers");

var Main = React.createClass({

  getInitialState: function() {
    return { searchTerm: "", results: [], history: [] };
  },

  componentDidMount: function() {
    helpers.getHistory().then(function(response) {
      console.log(response);
      if (response !== this.state.history) {
        console.log("History", response.data);
        this.setState({ history: response.data });
      }
    }.bind(this));
  },

  componentDidUpdate: function() {

    helpers.runQuery(this.state.searchTerm).then(function(data) {
      console.log(data);
      if (data !== this.state.results) {
        console.log("Address", data);
        this.setState({results: data});

        helpers.postHistory(this.state.searchTerm).then(function() {
          console.log("Updated!");

          helpers.getHistory().then(function(response) {
            console.log("Current History", response.data);

            console.log("History", response.data);

            this.setState({ history: response.data });

          }.bind(this));
        }.bind(this));
      }
    }.bind(this));
  },
  setTerm: function(term) {
    this.setState({ searchTerm: term });
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">NYT Article Finder!</h2>
            <p className="text-center">
              <em>Enter a full or partial title of an article (ex: "50 Years of...").</em>
            </p>
          </div>

          <div className="col-md-6">

            <Form setTerm={this.setTerm} />

          </div>

          <div className="col-md-6">

            <Results address={this.state.results} />

          </div>

        </div>

        <div className="row">

          <History history={this.state.history} />

        </div>

      </div>
    );
  }
});

module.exports = Main;