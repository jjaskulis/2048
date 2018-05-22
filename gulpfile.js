const gulp = require("gulp");
const sass = require("gulp-sass");
const prefixer = require("gulp-autoprefixer");

gulp.task("sass",()=>{
    gulp.src("./src/scss/*.scss")
    .pipe(sass().on('error',sass.logError))
    .pipe(prefixer())
    .pipe(gulp.dest("./build/css/"))
})

gulp.task("watch",()=>{
    gulp.watch("./src/scss/*.scss",["sass"])
})