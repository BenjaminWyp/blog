const gulp = require('gulp');
const ts = require("gulp-typescript");
const tsProject = ts.createProject('tsconfig.json');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

gulp.task("default", function(){
    return tsProject
        .src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write())
        // .pipe(sourcemaps.write("./maps", () => {
        //     sourceRoot: file => {
        //         return p.join(file.cwd, 'lib');
        //     }
        // }))
        .pipe(gulp.dest("dist"));
})

