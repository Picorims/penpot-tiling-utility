# Contributing

Thank you for your interest in contributing to this Penpot plugin! The recommended process is as follows:

- Create an issue for the bug or enhancement you want to handle. **This give room for discussion before starting development**. You can also pick an existing issue, and inform in a comment that you would like to handle it. But I would prefer in all cases that we discuss things before starting development.
- Make a fork of this GitHub repository.
- Use a separate feature branch for the issue.
- Check the development guide at the root of the project. This will help you making your way around the architecture, and ensure your work is in line with the rest of the project.
- Test your changes by using `npm run build:dev` and trying out the plugin in Penpot.
- If you mutate the pattern format, bump the version, and add necessary logic to migrate old patterns.
- Format the code before submission. No actions are in place, and the linter isn't fully configured and will complain for the penpot namespace. But some generic check will still be performed.
- Open a pull request on the main repository. Try to explain briefly your work, to make the reviewing process easier.

If anything is not clear, you can contact me at picorims.contact@gmail.com. You may also open a discussion on GitHub.