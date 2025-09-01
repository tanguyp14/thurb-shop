const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const fs = require('fs');
const path = require('path');
const sourcemaps = require('gulp-sourcemaps');

// Configuration
const scssSourceDir = './tylt/scss/';
const outputFile = './tylt/scss/all.scss';
const outputCssDir = './assets/';

// Variable pour éviter les exécutions multiples
let isRunning = false;

// Génère le fichier all.scss avec les imports
function generateImports(done) {
    if (isRunning) {
        done();
        return;
    }

    console.log('Génération de all.scss...');
    fs.readdir(scssSourceDir, (err, files) => {
        if (err) {
            console.error('Erreur lecture dossier SCSS:', err);
            done(err);
            return;
        }

        const scssFiles = files
            .filter(file => file.endsWith('.scss') && file !== path.basename(outputFile))
            .map(file => `@use '${file}' as *;`);

        fs.writeFile(outputFile, scssFiles.join('\n'), err => {
            if (err) {
                console.error('Erreur écriture all.scss:', err);
                done(err);
                return;
            }
            console.log('all.scss généré avec succès');
            done();
        });
    });
}

// Compile le SCSS en CSS
function buildStyles(done) {
    if (isRunning) {
        done();
        return;
    }
    isRunning = true;

    console.log('Compilation CSS en cours...');
    gulp.src(outputFile)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            implementation: require('sass')
        }).on('error', sass.logError))
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(outputCssDir))
        .on('end', () => {
            isRunning = false;
            done();
            console.log('Compilation terminée');
        });
}

// Tâche principale
const scssTask = gulp.series(generateImports, buildStyles);

function watch() {
    // Utilisation de ignoreInitial pour éviter le déclenchement initial
    gulp.watch(
        [`${scssSourceDir}/**/*.scss`, `!${outputFile}`],
        { ignoreInitial: false },
        scssTask
    );
}

// Export des tâches (méthode moderne)
exports.scss = scssTask;
exports.watch = watch;
exports.default = gulp.series(scssTask, watch);
