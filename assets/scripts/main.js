/*******************************************************************************
*
* Name:         main.js
*
* Description:  Source script for the React.js Git Commit list Demo
*
* Author:       Raven N. Allan
*
* Date:         10.09.15
*
*******************************************************************************/
(function($)
{
	var TodoList = React.createClass({
		render: function() {
			var createItem = function(itemText, index) {
				return (
					<li data-id={index} key={index} className="has-children">
						<label htmlFor={index}>{itemText}</label>
					</li>
				);
			};
			return <ul className="cd-accordion-menu">{this.props.items.map(createItem)}</ul>;
		}
	});

	var UserGist = React.createClass({
		
		getInitialState: function() {
			return {items: [], title: ''};
		},

		componentDidMount: function() {
			$.get(this.props.source, function(result) {

			if (this.isMounted()) {
				// for (var i = 0; i < result.length; i++) { // result.length = # of latest commits, in this case 30 available via JSON returned data
				for (var i in result) {
					var lastGist = result[i];
					this.setState({title: lastGist.title});
					
					var nextItems = this.state.items.concat([lastGist.title]);
					this.setState({items: nextItems});
					this.forceUpdate();
				}
			}}.bind(this));
		},

		render: function() {
			return (
				<div>
					<h1><a href="https://github.com/geekindapink/React-CommitsList" target="_blank">Latest React.js Commits</a></h1>
					<TodoList items={this.state.items} />
				</div>
			);
		}
	});

	ReactDOM.render(<UserGist source="https://api.github.com/repos/facebook/react/pulls" />, content);

}(jQuery));