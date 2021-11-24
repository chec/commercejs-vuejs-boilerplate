![Commerce.js Vue Boilerplate Header](https://github.com/chec/commercejs-vuejs-boilerplate/blob/master/src/assets/boilerplate.jpg)

## Introduction

This boilerplate was developed to help developers build quick eCommerce sites in the Commerce.js ecosystem. Included is a complete, unstyled, product listing, cart, and checkout workflow to aid in fast and easy development using the Vue.js framework.

![](https://github.com/chec/commercejs-vuejs-boilerplate/blob/master/src/assets/Boilerplatedemo.png)

## Features

- Listing page view for your products.
- A complete cart that calculates totals and allows for editing and removing products.
- Fully featured checkout with Shipping and Tax calculations. 
- Thank you page template.
- 404 page template

## Installation

### Download

Clone the git repo into the folder of your choice - `git clone https://github.com/chec/commercejs-vuejs-boilerplate.git`

Alternatively, you can [download](https://github.com//chec/commercejs-vuejs-boilerplate/archive/master.zip) the project as a zip file to your computer.

### Project setup

Simply run `npm install` or `yarn install` if you use [Yarn Package Manager](https://yarnpkg.com/) from the root of your project folder. This will install all the necessary packages required to run the boilerplate. 

### Copy example env and add Chec credentials

This boilerplate ships with an example.env file that you will need to copy and fill with your Commerce.js credentials.   

First create a copy of the example.env file named .env in the root of your project.  You can do this by running cp example.env .env in the root folder.  The .env will look something like this:

```
NODE_ENV=local
VUE_APP_CHEC_PUBLIC_KEY={YOUR_API_KEY}
VUE_APP_CHEC_API_URL=https://api.chec.io`
```

Add in your Commerce.js public API key which can be found in the developer's settings of the [dashboard](https://dashboard.chec.io/settings/developer).

## Working with the boilerplate
 
### Compile and hot-reload for development

To aid in building your site, this boilerplate ships with a development environment which supports hot-reload on save. Run  `npm run serve` or `yarn serve` from the root of the project. After it has compiled, you will be able to view the boilerplate in your browser by visiting `http://localhost:8080/#/`.


### Compiles and minifies for production

When you are ready to ship your project, simply run `npm run build` or `yarn build` from the root of your project. This will create a production ready version of your project.


### Lints and fixes files

`npm run lint` or `yarn lint` to run the linter. You can configure the linting rules via the `eslintConfig`  field in the `package.json`  file.

See the [ESLint documentation](https://eslint.org/docs/user-guide/configuring) for further detail.


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Whats next?

At this point you should have the project fully up and running ready for you to add your theme or custom integrations. We look forward to seeing what you come up with!

## Additional Resources

### Join us on Slack

Join us on Slack with other eCommerce developers and designers. 

[![Join Us on Slack](https://github.com/chec/commercejs-vuejs-boilerplate/blob/master/src/assets/slackButton.png)](http://slack.commercejs.com)


### Documentation
[Commerce.js SDK Docs](https://commercejs.com/docs/).  
[Commerce.js API Docs](https://commercejs.com/docs/api/#introduction).  

### Examples
[Styled boilerplate demo](https://shoppable-campaign-demo.netlify.app/#/)

## ⚠️ Note

### This repository is no longer maintained
However, we will accept issue reports and contributions for this repository. See the [contribute to the commerce community](https://commercejs.com/docs/community/contribute) page for more information on how to contribute to our open source projects. For update-to-date APIs, please check the latest version of the [API documentation](https://commercejs.com/docs/api/).
