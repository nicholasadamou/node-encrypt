/* eslint-disable */
var cryptoJSON = require('crypto-json');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var envfile = require('envfile')

// Grab the key file
var key = fs.readFileSync('./_secrets/key.txt', 'utf8');

// Directories to work with
var dirs = require('./_directories');

// Loop through the Directories
dirs.forEach(function(dirname) {
  // Read all files in directory
  fs.readdir(dirname, function(err, filenames) {
    // Check for errors
    if (err) console.warn(err);
    // For each of the files
    filenames.forEach(function(filename) {
      var ext = path.extname(filename);

      // Encrypt JSON files
      if (ext === '.json') {
        // Encrypt JSON
        var object = JSON.parse(fs.readFileSync(dirname + filename, 'utf8'));
        var encrypted = cryptoJSON.encrypt(object, key, { algorithm: 'camellia-128-cbc' });

        // Save JSON
        fs.writeFileSync(dirname + filename + '.enc', JSON.stringify(encrypted, null, 4));

        return;
      }
    });
  });
});
