const gulp = require("gulp");
const ts = require("gulp-typescript");

gulp.task("default", () => {
  return gulp
    .src("src/**/*.ts")
    .pipe(
      ts({
        noImplicitAny: true,
        experimentalDecorators: true,
        esModuleInterop: true,
        removeComments: true,
      }),
    )
    .pipe(gulp.dest("dist"));
});
