import { join } from 'path';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    // this.GOOGLE_ANALYTICS_ID = 'Your site's ID';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      {src: 'leaflet/dist/leaflet.js', inject: 'libs'},
      {src: 'leaflet/dist/leaflet.css', inject: true}, // inject into css section
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    this.ROLLUP_INCLUDE_DIR = [
      ...this.ROLLUP_INCLUDE_DIR,
      //'node_modules/moment/**'
    ];

    this.ROLLUP_NAMED_EXPORTS = [
      ...this.ROLLUP_NAMED_EXPORTS,
      //{'node_modules/immutable/dist/immutable.js': [ 'Map' ]},
      //{'node_modules/leaflet/dist/leaflet.js': [  'leaflet' ]},
      {
        'node_modules/leaflet/dist/leaflet.js': [
          'tileLayer', 'circle', 'polygon', 'marker', 'latLngBounds', 'latLng', 'map', 'control'
        ]
      },
    ];

    // Add packages (e.g. ng2-translate)
     let additionalPackages: ExtendPackages[] = [{
       name: 'leaflet',
       // Path to the package's bundle
       path: 'node_modules/leaflet/dist/leaflet.js'
     },
     {
        name: '@asymmetrik/ngx-leaflet',
        path: 'node_modules/@asymmetrik/ngx-leaflet/dist/bundles/ngx-leaflet.js'
     }
     ];

     this.addPackagesBundles(additionalPackages);

     this.SYSTEM_BUILDER_CONFIG.packageConfigPaths = [
       ...this.SYSTEM_BUILDER_CONFIG.packageConfigPaths,
      // for other modules like @ngx-translate the package.json path needs to updated here
      // otherwise npm run build.prod would fail
      // join('node_modules', '@ngx-translate', '*', 'package.json')
      join('node_modules', '@asymmetrik', '*', 'package.json')
     ];

    /* Add proxy middleware */
    // this.PROXY_MIDDLEWARE = [
    //   require('http-proxy-middleware')('/api', { ws: false, target: 'http://localhost:3003' })
    // ];

    /* Add to or override NPM module configurations: */
    // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
  }

}
