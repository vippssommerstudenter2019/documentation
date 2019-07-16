import React from 'react';
import PropTypes from "prop-types";
import "../../Util"
import { objectIsEmpty } from '../../Util';
import "./Response.css"
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import SwaggerExtracter from "../../model/SwaggerExtracter";

const propTypes = {
    statusCode: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    json: PropTypes.object.isRequired
};

class Response extends React.Component {

    constructor(props) {
        super(props);

        this.expandCollapsible = this.expandCollapsible.bind(this);
        this.swaggerExtracter = new SwaggerExtracter();
    }

    componentDidMount() {
        Prism.highlightAll();
    }

    /**
     * Expands the collapsible.
     */
    expandCollapsible(event) {
        event.target.classList.toggle("response-active");
        var content = event.target.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        } 
    }

    render() {

        const error = (this.props.statusCode !== "200");
        const buttonClassName = "response-button-collapsible" + (error ? " error" : "");
        const displayerClassName = "response-displayer-collapsible" + (error ? " error" : "");

        // There is content in the response, we'll add a collapsible to display the response. 
        if (!objectIsEmpty(this.props.json)) {

            const schema = this.swaggerExtracter.lookForObjectWithName("schema", this.props.json);

            return (
                <div key={this.props.statusCode} className="response-wrapper codeview">
                    <button className={buttonClassName} onClick={this.expandCollapsible}>
                        <b>{this.props.statusCode}</b> {this.props.description}
                    </button>
                    <div key={this.props.statusCode} className="response-content">
                        <pre>
                            <code className="language-javascript">
                                {JSON.stringify(this.swaggerExtracter.buildBody(schema, false), null, 4)}
                            </code>
                        </pre>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div key={this.props.statusCode} className="response-wrapper">
                    <div className={displayerClassName}>
                        <b>{this.props.statusCode}</b> {this.props.description}
                    </div>
                </div>
           );
        }
    }
}


Response.propTypes = propTypes;

export default Response;