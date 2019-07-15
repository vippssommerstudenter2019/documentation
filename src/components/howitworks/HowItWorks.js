import React from 'react';
import Content from "./Content"
import { StickyContainer } from 'react-sticky';
import IntroBox from "./IntroBox";
import OutroBox from "./OutroBox";
import PropTypes from "prop-types";
import "../../model/SwaggerExtracter";
import '../../styles/how-it-works.css';
import $RefParser from "json-schema-ref-parser";

/**
 * The input props. 
 */
const propTypes = {
	intro: PropTypes.object.isRequired,
	sections: PropTypes.array.isRequired,
	outro: PropTypes.object.isRequired,
	swaggerURL: PropTypes.string.isRequired,
};

/**
 * Represents a site where a certain Vipps API is given an overview and an implementation example.
 */
class HowItWorks extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			swaggerData: {}
		};
	}

	componentDidMount() {
		// Fetch the json data from the swagger file at the given url.
		fetch(this.props.swaggerURL)
		.then(response => response.json())
		.then((response) => {

			// We use a reference parser to inject all the references in the json file with content, in that way we can extract bodies with examples for example.
			$RefParser.dereference(response, (error, data) => {
				if (error) {
					console.error(error);

					// TODO: Handle error
				}
				else {
					this.setState({ swaggerData: data }); 
				}
			});    

		});
	}

	render() {

		return (
			<div className="App">
				<IntroBox content={this.props.intro} />
				<Content 
					url="https://raw.githubusercontent.com/vippsas/vipps-ecom-api/master/docs/swagger.yaml" 
					sections={this.props.sections}
				/>
				<OutroBox content={this.props.outro} />
			</div>
		)
	}
}

HowItWorks.propTypes = propTypes;

export default HowItWorks;
