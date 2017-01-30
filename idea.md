#Motivation
This idea is originated when I was working on another repository called [hello_translator](https://github.com/GHLgh/hello_translator)
where I have multiple markdown files to keep track on multiple things.

And then it occurred to me that it might be cool if I can display the content of different markdown files into readme.md file
which will be parsed and displayed by GitHub automatically. In this case, we can construct the readme.md into seperate files
and it should be easier to update the documentation by modules.

#Project Design
What is my approach to implement the project (this might change over the development of the project)

* Since GitHub will remove some kinds of tags when parsing the markdown file, perhaps we can use a server with RESTful API for changing content of target markdown file. And actually using those tags as identifier for the server to local the position for changes.<br>(ex. \<script src="someIdentifier"\>some source file\</script\>  \<p\>place holder for possible content\</p\>)
  * This is a trick for GitHub's markup tool, but it should also work on normal tool for parsing and serving markdown file since unaccessable url shouldn't harm anything (although sercurity factor hasn't been considered).
* Build an application on top of GitHub's APIs for getting content of source markdown files and updating content of target markdown file (and maybe automatically run the process using "hook" API inspired from [travis-ci](travis-ci.org))
  * Need to learn more about the APIs by testing with [postman](https://www.getpostman.com/), because I am not one hundred percent sure about how those APIs work for now.
* Workflow
  * The application will be trigger by a request (or by hook)
  * Analyze the request about what the target file is and get content of the file by [get-contents API](https://developer.github.com/v3/repos/contents/#get-contents)
  * Parse the file with predefined identifiers and use get-contents API for receiving content of source files which the identifiers specify
  * Change the content of target file (where the server has a copy from step 2) and use [update-a-file API](https://developer.github.com/v3/repos/contents/#update-a-file) to update the target file in GitHub repository
  * The target file should be served with updated content in GitHub
