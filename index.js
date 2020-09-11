const core = require('@actions/core');
const github = require('@actions/github');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const myToken = core.getInput('repo-token');

    const octokit = github.getOctokit(myToken)
    const { labels, number } = github.context.payload.pull_request;
    // You can also pass in additional options as a second parameter to getOctokit
    // const octokit = github.getOctokit(myToken, {userAgent: "MyActionVersion1"});
    
  if(labels.includes('automerge')) {

    await octokit.pulls.merge({
      pull_number: number,
    })
  }

    // const { data: pullRequest } = await octokit.pulls.get({
    //     owner: 'octokit',
    //     repo: 'rest.js',
    //     pull_number: 123,
    //     mediaType: {
    //       format: 'diff'
    //     }
    // });
    // console.log(pullRequest)

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
