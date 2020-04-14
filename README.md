# Quick SF Cache API Example Component _(fauxSFDCCache)_

[![Salesforce API v48.0](https://img.shields.io/badge/Salesforce%20API-v48.0-blue.svg)]()
[![Lightning Experience Required](https://img.shields.io/badge/Lightning%20Experience-Required-informational.svg)]()
[![User License Platform](https://img.shields.io/badge/User%20License-Platform-032e61.svg)]()
[![Apex Test Coverage 0](https://img.shields.io/badge/Apex%20Test%20Coverage-0-red.svg)]()

>Using a Heroku endpoint to simulate a remote system, and illustrating how pre-caching data in Platform Cache can drastically improve throughput for a LWC in Salesforce. This is the SF side.

Hoping this helps figure out initial usecases for a criminally underused tool, Platform Cache. Any custom views or algorithms reliant on data costly to gather, either by joins, integrations, or processing, especially if the results are somewhat static, can be massively improved by leveraging Cache. Also it's free to play around with, so like play with it y'all.

## Background

Platform Cache, that thing you never knew you never knew about. Hoping to continue the trend of growing use of the non-SObject storage options in Salesforce, here's a quick and dirty API example, complete with endpoint API to play around with.

## Install

1. Set up your environment. Follow the steps in the [Quick Start: Lightning Web Components](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) Trailhead project. The steps include:

-   Enable Dev Hub in your Trailhead Playground
-   Install Salesforce CLI
-   Install Visual Studio Code
-   Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension

2. If you haven't already done so, authenticate with your hub org and provide it with an alias (**myhuborg** in the command below):

```
sfdx force:auth:web:login -d -a myhuborg
```

3. Clone the repository:

```
git clone https://github.com/cowie/fauxSFDCCache
cd fauxSFDCCache
```

4. Create a scratch org and provide it with an alias (**fauxCache** in the command below) - in order to work with Cache, you need to ensure your config file (if you are weird and don't use the one included with this repository) has 'PlatformCache' listed in the 'features' array. If that doesn't make sense, just use the file I gave you:
```
sfdx force:org:create -s -f config/project-scratch-def.json -a fauxCache
```

5. Push the app to your scratch org:

```
sfdx force:source:push
```

6. Assign the **FauxCacheUser** permission set to the default user:

```
sfdx force:user:permset:assign -n FauxCacheUser
```

7. Open the org up and check out the Contact tab. 
```
sfdx force:org:open
```

8. Create a new contact. On that page should be the Faux Records component table. If not, go into Setup->Edit Page, and add it onto your page. Note you can change the labels on the table and columns to whatever you need for funsies.

9. If you want to see the time impacts, load up your developer console and monitor the logs. The Apex running behind the scenes is doing a time check, and will output in system.debug for you.


## Extra Sections
### Security / Limitations
Lots of Cache tips here in the main thrust of docs
https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_platform_cache_org_examples.htm

## Maintainers
[Cowie](https://github.com/cowie)

## Contributing
<!--Give instructions on how to contribute to this repository. Where do I ask questions? Do you accept PRs? What are the requirements to contribute? Don't be a jerk. Use issues if you can.-->

Always looking for more usecases from anyone. Build ya code and add it in a pull req.
Oh if y'all want to do my test code for me too, it's cool. Just sayin'.

## License
[MIT](LICENSE) © CDG