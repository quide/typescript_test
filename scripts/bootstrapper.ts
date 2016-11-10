import paintersLoader = require('./paintersLoader');
import painter_module = require('./painter');
import painters_module = require('./painters');
import renderer_module = require('./renderer');
//import $ = require('./libs/jquery-1.12.2');

export class Bootstrapper {
 
  renderer: renderer_module.Renderer;
  
  painters: painters_module.Painters<painter_module.Painter>;

  loadPainters() {
      var el = (<HTMLSelectElement> document.getElementById('Painter'));
      try {
          let painter = this.painters.items
              //Find selected item by name
              .filter(item => item.name === el.value)
              //return the item
              .reduce(item => {
                var rc = new painter_module.Painter();
                rc.name = el.value,
                    rc.style = item.style,
                    rc.examples = item.examples;
                return rc;                
              });
          this.renderer.renderPainter(painter);
      }
      catch (ex) { alert(ex.message) }
  }
  
  init() {
      let paintersSelect = (<HTMLSelectElement>document.getElementById('Painter'));
      paintersSelect.onchange = () => this.loadPainters();

      let painterLoad = new paintersLoader.PaintersLoader("/json/famousPainters.json");
      
      painterLoad.load().then((data: painters_module.Painters<painter_module.Painter>) => {
          this.painters = data;
          this.renderer = new renderer_module.Renderer(this.painters);
      });
  }
  
}



(() => { 
  var bootstrapper = new Bootstrapper();
  bootstrapper.init();
})();

  




