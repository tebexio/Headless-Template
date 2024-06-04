# Contributing Guidelines

We welcome everyone to contribute towards the Tebex Project to help create better and more stable applications. You are free to contribute and raise pull requests. The Tebex team will review the proposed changes and, if appropriate, merge the the changes into our code. 

For Customer support Please contact our support team at [support@tebex.io](mailto:support@tebex.io)

## Local development

```shell
# Clone the repo
git clone git@github.com:MY_FORK/Headless-Template.git

# Move into the directory
cd Tebex.js

# Add the upstream repo
git remote add upstream git@github.com:tebexio/Headless-Template.git

# Get the latest upstream changes
git pull upstream

# Install dependencies
npm install
```

## Making Changes
Ensure that your changes adhere to the current coding conventions used in this project, this means using indentation, accurate comments etc.

## Submitting Changes
1. Commit your changes in logical chunks, i.e. keep your changes small per single commit with a clear description.
2. Locally merge (or rebase) the upstream branch into your branch: `git pull upstream && git merge`.
3. Push your topic branch up to your fork: `git push origin <branch-name>`.
4. Open a [Pull Request](https://help.github.com/articles/using-pull-requests) with a clear title and description.
