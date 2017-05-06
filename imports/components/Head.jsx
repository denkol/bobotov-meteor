/* React libs */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";

/* Meteor libs */

/* Components */

/* Some functions */

/* Semantic UI */

/* Material UI */

/* Other */

export default class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="app-meta">
        <Helmet
          encodeSpecialCharacters={true}
          titleTemplate="MySite.com - %s"
          defaultTitle="My Default Title"
          onChangeClientState={(newState) => console.log(newState)}
        >
          <html lang="en" amp />
          <body className="root" />
          <title itemProp="name" lang="en">My Title</title>
          <base target="_blank" href="http://mysite.com/" />
          <meta name="description" content="Helmet application" />
          <meta property="og:type" content="article" />
          <link rel="canonical" href="http://mysite.com/example" />
          <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />

          
          <script src="http://include.com/pathtojs.js" type="text/javascript" />

          
          <script type="application/ld+json">{`
              {
                  "@context": "http://schema.org"
              }
          `}</script>

          
          <noscript>{`
              <link rel="stylesheet" type="text/css" href="foo.css" />
          `}</noscript>

          
          <style type="text/css">{`
              body {
                  background-color: blue;
              }

              p {
                  font-size: 12px;
              }
          `}</style>
        </Helmet>
      </div>
    );
  }
}

Head.propTypes = {};