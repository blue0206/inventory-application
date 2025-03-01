import shell from "shelljs";

// Copy all the view templates
shell.cp("-R", "src/views", "dist/");
// Copy all the static assets
shell.cp("-R", "src/public/*.css", "dist/public/");

