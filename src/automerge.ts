import * as core from '@actions/core';
import * as github from '@actions/github';

// most @actions toolkit packages have async methods
export default async () => {
  try {
    const myToken = core.getInput('repo-token');

    const octokit = github.getOctokit(myToken)
    const pullRequest = github.context.payload.pull_request;

  if(pullRequest.labels.some(({name}) => name === "automerge")) {
    await octokit.pulls.merge({
      owner: pullRequest.base.repo.owner.login,
      repo: pullRequest.base.repo.name,
      pull_number: pullRequest.number,
    })
  }

  } catch (error) {
    core.setFailed(error.message);
  }
}
