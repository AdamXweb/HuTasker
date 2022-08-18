<p align="center">
  <a href="https://hutasker.netlify.app">
    <img width="120" src="https://github.com/AdamXweb/HuTasker/blob/main/static/logo-hutasker.png?raw=true">
    <h1 align="center">HuTasker</h1>
  </a>
</p>

<p align="center">
<i>HuTasker is a sample site showing potential for integration between AirTable's API and Hugo, presented as a task tracker app</i>
 <br/>
</p>

![hutasker-preview](https://user-images.githubusercontent.com/6800453/184602822-d7ec9503-b002-41a1-9822-627271399372.gif)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c8f91e29-d6d6-49a6-b610-ee248744b55a/deploy-status)](https://app.netlify.com/sites/hutasker/deploys)
<a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-0aa8d2?logo=opensourceinitiative&logoColor=fff" alt="License MIT">
</a>
 <a href="./.github/CHANGELOG.md">
    <img src="https://img.shields.io/github/package-json/version/adamxweb/hutasker?logo=azurepipelines&amp;color=0aa8d2" alt="Current Version">
  </a>
  <br>
![Speed](https://raw.githubusercontent.com/AdamXweb/HuTasker/main/static/metrics/pagespeed.svg)
  | :warning: | **HuTasker is currently in development and is not ready for production.** <br> We will post an update once it is ready for use as a template. &nbsp;&nbsp;&nbsp;&nbsp; |
| - |:-|

<details>
  <summary><h2>Table of Contents</h2></summary>
  <p>
  
  - **Getting Started**
  - [👩‍💻 Motivation](#motivation-)
  - [🌈 Features](#features-)
  - [🚀 Getting Started](#getting-started-)
  - [📖 Documentation](#documentation-)
</p>
</details>


<details>
<summary>
<h2>👩‍💻 Motivation</h2>
</summary>
Static Site Generators (SSG) have great potential to build a dynamic site minus a lot of javascript bloat. This makes them quick to load, hugely configurable and able to be hosted anywhere.

A limitation to SSGs can be usability from a non-technical user perspective. There are multiple CMS options available, but all have setbacks and limitations.

This isn't meant to be a perfect solution, however I wanted to make some code public that has only been on private repos. The opportunity to use AirTable like a database was interesting (of course no CRUD). To get data on a CRON schecule (could be every minute) is a great way to make a static site seem dynamic thanks to a frequent build.

### Possibilities

- Could use airtable as a CMS, to manage blog posts (silly, but more user friendly for some people)
- Visualise data effectively
- Capture data in a landing page with embedded AirTable
- Intranet for company info behind password protection

### Limitations

It doesn't really make sense in a real life application due to so many factors. Some of which being:
- Architecture chosen vs build times would cost a lot
- Security is poor, with whole chuncks of files being downloaded without auth, filtering etc. (easy to copy data)
- AirTable has its own limitations (only downloading a CSV -> needs to be transformed)

</details>

## 🌈 Features 
- Pulls Data from AirTable's API on a schedule (CRON with Github workflow), that can populate the pages
- View the roadmap of features in the [Project tab.](https://github.com/users/AdamXweb/projects/1/views/2?query=is%3Aopen+sort%3Aupdated-desc). 

## 🚀 Getting Started 
For more in-depth information, [check out the wiki](https://github.com/AdamXweb/HuTasker/wiki)

- Clone [repo](https://github.com/AdamXweb/HuTasker.git)
- Get a copy of the [AirTable data](https://airtable.com/shrCcwZGJUVRv0MzP/tblSHzrj6JvrCd070/viw5gDPSuXekYXbfR?blocks=hide)
- Read the [HuTasker Wiki](https://github.com/adamxweb/hutasker/wiki) to get the project configured and up and running

## 📖 Documentation
- [HuTasker](https://github.com/adamxweb/hutasker/wiki)
- [Hugo](https://gohugo.io/documentation/)
- [AirTable API](https://airtable.com/api)

### 📀 Demo Data 
View [sample data on Airtable](https://airtable.com/shrCcwZGJUVRv0MzP/tblSHzrj6JvrCd070/viw5gDPSuXekYXbfR?blocks=hide)

### ⚡ Performance

![Screenshot](https://raw.githubusercontent.com/AdamXweb/HuTasker/main/static/metrics/pagespeed.screenshot.svg)

## Supporting this project
You can support this project by sponsoring, or simply signing up with the Airtable Referral link below!
- [Airtable Referral link](https://airtable.com/invite/r/lottIZti)


# Acknowledgements
See the [full list on the acknowledgements page](https://hutasker.netlify.app/acknowledgements)

# Contributing
See the [Contributing Guide](https://github.com/AdamXweb/HuTasker/blob/main/CONTRIBUTING.md)

# LICENSE
[MIT License](https://github.com/AdamXweb/HuTasker/blob/main/LICENSE)
