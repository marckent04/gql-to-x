const gulp = require("gulp");
const ts = require("gulp-typescript");

gulp.task("default", () => {
  const tsProject = ts.createProject("tsconfig.json");

  const tsResult = gulp.src("src/**/*.ts").pipe(tsProject());

  return tsResult.js.pipe(gulp.dest("dist"));
});
