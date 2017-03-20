# [Storybook](https://getstorybook.io/)

## Generate CSS

Currently, it's not possible to directly use LESS files with Webpack to
add style to Storybook. Instead, we need to manually generate
the CSS file (`public/style.css`) from LESS files.

To update the CSS, **remove the file** and run the following command:
 
 ```sh
 ./node_modules/.bin/lessc --include-path=.storybook/styles/ styles/<filename>.less >> .storybook/public/style.css
 
 ```