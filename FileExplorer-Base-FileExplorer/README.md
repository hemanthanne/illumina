# Illumina.com standalone application Setup and Usage

## Table of Contents
1. [Contribution Guidelines](#contribution-guidelines)
2. [Getting Started](#getting-started)
    * [Install Prerequisites](#install-prerequisites)
    * [Downloading and Building the Project](#building-the-project)
3. [Common Issues](#common-issues)
4. [Helpful Tools](#helpful-tools)


---
## Using/Modifying this Readme
The purpose of this readme is to provide developers with the steps to install, run, and troubleshoot the set-up of Illumina.com standalone application on their local machines. Please update and modify this readme as needed.

This readme is custom developed.

## Contribution Guidelines
When you are making changes to the code in this repository, please follow these guidelines branching, committing, and pushing code.

***TODO: add Git workflow guidelines***

1. Commit messages should be in the following format:
    ```
    git commit -m "[Developer Name(s)] [defect/story ID] - commit message"
    ```
2. Commit messages should be specific enough to understand what changes are being made.    
    
    **The wrong way**:
    ```
    git commit -m "[Doe] [123456] - fixes 123456"
    git commit -m "[Dustin] [987654] - removes code"
    ```
    Developers scanning the commit logs do not have a quick and easy way of knowing what a commit does without doing a file diff or digging into each defect/user story.  


    **The right way**:
    ```
    git commit -m "[Doe] [123456] - fixes incorrect date parsing on advanced search page date picker"
    git commit -m "[Dustin] [987654] - removes duplicated MyAccount link in homepage footer"

    ```
    Developers can quickly scan through the commit logs to determine where an issue may have been introduced. For example, if there is a javscript error that is now happening in IE when picking a date on the advanced search page, the developer tasked with fixing the issue can easy see that Dustin made a change to date parsing and can take a look at the file diffs to track down the issue. 

---
## Getting Started
How to get Illumina.com DirExplore(Standalone application) up and running on a local developer machine


### Install Prerequisites
The following are required to be on your machine in order to build and run the United.com 2.0 project
1. Install Visual Studio Code
2. Install .NET CORE Framework 5.0.10 (if not already installed)
3. Install [NodeJS](http://www.nodejs.org) - version (14.5.1)
   - Note: If you are upgrading a previous version of Node, it is recommended that you delete all **node_modules** folders from the source code before running npm install.  
4. Install the [Angular CLI](https://angular.io/cli) - version 10.0.0

### Downloading and Building the Project

1. Open a command prompt window as admin
2. Clone source code from [DirExplore](https://github.com/)
    ```
    git clone https://github.com/
    ```
3. CD navigate to the root directory of the web project: **\\*PathToSource*\DirExplore\\**
4. Running npm install and npm run build inside the ClientApp are optional.
6. Open Visual Studio Code as an administrator (recommended the first time) and open the DirExplore application.
7. Build the application. 


---

## Common Issues

#### "Error NET::ERR_CERT_AUTHORITY_INVALID" when running the application for the first time:

Since the application is running on a local ev machine, one might face this issue. This will prevent the browser from landing on the home page of the application.

**Fix:** 
1. Click on Advanced button on the browser page
2. Click on Proceed to *Localhost* 
3. Verify the angular Hello World page.

#### "omnisharp build error while building the application"

Follow these steps to fix this issue:
1. In Visual Studio code, go to **File > Preferences > Settings**
2. In the "Search settings" window, type omnisharp.path
3. Click on "Edit in settings.json" link.
4. Add (or edit) like this: "omnisharp.path": "latest"

---

## Helpful Tools
* [Fiddler](http://www.telerik.com/fiddler) - debugging proxy tool
* [Postman](https://www.getpostman.com/) - API testing tool

---

# DirExplore

This project was generated with [.NET 5.0](https://dotnet.microsoft.com/download) version 5.0.10 and [Angular CLI](https://angular.io/cli) version 10.0.0.

## Development server

Run `dotnet run` for a dev server. Navigate to `https://localhost:5001/`.

## Build

Run `dotnet build` to build the project. The build artifacts will be stored in the `bin/` directory. 

## Running unit tests

Run `dotnet test` to execute the unit tests via specified test runner.

## Further help

To get more help on the dotnet use `dotnet help` or go check out the [dotnet CORE CLI README](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-help).
