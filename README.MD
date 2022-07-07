# HuTasker
A Hugo sample site with integration with AirTable to emulate a sample 'task' site.

## Purpose
To experiment with alternate use cases of AirTable and Hugo, in a public format.

## Developing
- Clone repo
- npm install
start app with
- npm start
### 1. Install Node

Download and install [Node.js](https://nodejs.org/) (it includes npm) for your platform.

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run start
```

## Documentation
- [Hugo](https://gohugo.io/documentation/)
- [HuTasker](https://github.com/adamxweb/hutasker/wiki)
- [AirTable API](https://airtable.com)

### Dependencies
- [Airtable](https://airtable.com/invite/r/lottIZti) or [Referral link](https://airtable.com/invite/r/lottIZti)
- Bootstrap
- Mapbox

## Limitations

It doesn't really make sense in a real life application due to so many factors. Some of which being:
- Architecture chosen vs build times would cost a lot
- Security is poor, with whole chuncks of files being downloaded without auth, filtering etc. (easy to copy data)
- AirTable has its own limitations (only downloading a CSV -> needs to be transformed)

# Possibilities

- Could use airtable as a CMS, to manage blog posts (silly, but more user friendly for some people)
- Visualise data effectively
- Capture data in a landing page with embedded AirTable
- Intranet for company info behind password protection


# Future
[creating pages](https://github.com/kidsil/hugo-data-to-pages)

# Acknowledgements
CSV-Json
data to pages
Theme looseley based on h-enk's Doks

# Contributing