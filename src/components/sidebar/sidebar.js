import React from "react";
import {
  SideNav,
  SideNavItem,
  Collapsible,
  CollapsibleItem
} from "react-materialize";
import "./materialize.css";
import M from "materialize-css";


// Contains the menuitems and backlink
export const Sidebar = (props) => (
  <section className="Sidebar">
    <SidebarHeader />
    <SidebarMenu headers={props.headers}/>
  </section>
);

// Header for logo and backlink
const SidebarHeader = () => (
  <div className="SidebarHeader">
    <img
      className="Logo logoMarg"
      src="https://www.vipps.no/static/vipps_theme/1.0.31/media/extra-images/vipps-logo.svg"
      alt="logo"
    />
  </div>
);

// Structures the sidebar content
const SidebarMenu = (props) => (
  <div className="SidebarMenu">
    <SidebarNav headers={props.headers}/>
    <ApiLink />
  </div>
);

// Navigation Menu
const SidebarNav = (props) => {
    //TODO: List elements should be
    const propHeaders = props.headers;
    const sidebarHeaders = propHeaders.map((head) =>
        <CollapsibleItem header={Object.values(head)[0]}>
            <ul>
            {Object.values(head)[2].map((child) =>
                <li class="listEl">
                {Object.values(child)[0]}
                </li>
            )}
            </ul>
        </CollapsibleItem>
    );
    return (
        <div>
            <SideNav className="sidebarMarg">
            <Collapsible>
                {sidebarHeaders}
            </Collapsible>
            </SideNav>
        </div>
        )
    };

// Links to full api doc
const ApiLink = () => (
  <button className="ApiLink sidebarMarg">Full API Documentation</button>
);