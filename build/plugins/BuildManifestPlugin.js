const fs = require('fs');
const path = require('path');

function BuildManifestPlugin(thing) {
    this.thing = thing;
}

BuildManifestPlugin.prototype.apply = function (compiler) {
    compiler.plugin('emit', (compiler, callback) => {
        const manifest = JSON.stringify(compiler.getStats().toJson().assetsByChunkName);
        compiler.assets['manifest.json'] = {
            source: () => manifest,
            size: () => manifest.length
        };
        callback();
    });
};



module.exports = BuildManifestPlugin;