import painter_module = require('./painter');
import painters_module = require('./painters');

export class Renderer {
    constructor(painters: painters_module.Painters<painter_module.Painter>) {
        this.renderPainters(painters);
    }

    renderPainters(painters: painters_module.Painters<painter_module.Painter>) {
        var recipeSelect = document.getElementById('Painter');
        painters.items.forEach((painter) => {
            var opt = document.createElement('option');
            opt.setAttribute('title', painter.name);
            opt.innerHTML = painter.name;
            recipeSelect.appendChild(opt);
        });
    }

    renderPainter(painter: painter_module.Painter) {
        //Update description
        var el = (<HTMLSelectElement> document.getElementById('painterStyle'));
        el.innerHTML = painter.style;

        this.renderExamples(painter);
    }

    renderExamples(painter: painter_module.Painter) {
        //Update examples
        var examples = (<HTMLSelectElement> document.getElementById('examples'));
        examples.value = '';

        var html = '<ol>';
        for (var i = 0, len = painter.examples.length; i < len; i++) { 
            var example = painter.examples[i];
            //var ingredients = example.ingredients.map((ingredient:any) => {
            //    return ingredient.name;
            //});

            html += '<li>' +
            '<h4>' + example + ' </h4>' //+
            //'<strong>Ingredients: </strong>' + ingredients.join(', ') +
            //'<br /><strong>Preparation Time: </strong>' + example.prepTime +
            '</li>';
        }

        examples.innerHTML = html + '</ol>';
    }

    renderError() {
        var examples = (<HTMLSelectElement> document.getElementById('examples'));
        examples.value = 'Unable to load data!';
    }
} 