/** @jsx React.DOM */

var productAdded = require('./productevents').productAdded;
var productRemoved = require('./productevents').productRemoved;
var React = require('react');

var Product = React.createClass({
  getInitialState: function() {
    return {
      addedToCard: false
    };
  },
  addToCart: function() {
    this.setState({
      addedToCard: true
    });
    productAdded.publish(this.props.product);
  },
  componentDidMount: function() {
    productRemoved.subscribe(this.onProductRemoved);
  },
  componentWillUnmount: function() {
    productRemoved.unsubscribe(this.onProductRemoved);
  },
  onProductRemoved: function(e, removed) {
    if (removed === this.props.product) {
      this.setState({
        addedToCard: false
      });
    }
  },
  render: function() {
    var cartAction;
    if (this.state.addedToCard) {
      cartAction = <span className="btn btn-lg">In cart</span>;
    } else {
      cartAction = <button className="btn btn-success btn-lg" onClick={this.addToCart}>Add to Cart</button>;
    }
    return (
      <div className="col-6 col-sm-6 col-lg-4 cat">
        <img src={this.props.product.image} className="img-responsive" />
        <h2>{this.props.product.name}</h2>
        <h4>{this.props.product.price} BTC</h4>
        {cartAction}
      </div>
    );
  }
});

module.exports = Product;
