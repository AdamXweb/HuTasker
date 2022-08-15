# Contributing to HuTasker
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- Before jumping into a PR be sure to search [existing PRs](https://github.com/AdamXweb/HuTasker/pulls) or [issues](https://github.com/AdamXweb/HuTasker/issues) for an open or closed item that relates to your submission.

## Developing

The development branch is `main`. This is the branch that all pull
requests should be made against. The changes on the `main`
branch are tagged into a release monthly.

To develop locally, follow the [Developing guide](https://github.com/AdamXweb/HuTasker/wiki/Developing)

## Commit Guidelines

HuTasker uses the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
specification. The automatic changelog tool uses these to automatically generate
a changelog based on the commit messages. Here's a guide to writing a commit message
to allow this:

### Format

```
type(scope)!: subject
```

- `type`: the type of the commit is one of the following:

  - `feat`: new features.
  - `fix`: bug fixes.
  - `docs`: documentation changes.
  - `refactor`: refactor of a particular code section without introducing
    new features or bug fixes.
  - `style`: code style improvements.
  - `perf`: performance improvements.
  - `test`: changes to the test suite.
  - `ci`: changes to the CI system.
  - `build`: changes to the build system (we don't yet have one so this shouldn't apply).
  - `chore`: for other changes that don't match previous types. This doesn't appear
    in the changelog.
  - It is encouraged to add the Github issue to the commit message e.g. `fix: #1 etc`

## Making a Pull Request

- Be sure to [check the "Allow edits from maintainers" option](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/allowing-changes-to-a-pull-request-branch-created-from-a-fork) while creating you PR.
- If your PR refers to or fixes an issue, be sure to add `refs #XXX` or `fixes #XXX` to the PR description. Replacing `XXX` with the respective issue number. Se more about [Linking a pull request to an issue
  ](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue).
- Be sure to fill the PR Template accordingly.