/// <reference path="typings/require.d.ts" />

require.config({
    baseUrl: 'scripts',

    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        jquery: 'libs/jquery-1.12.2'
    }
});

requirejs(['bootstrapper']);