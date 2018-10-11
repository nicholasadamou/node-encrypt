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

      // Ignore non enc files
      if (ext !== '.enc') return;

      // Get the original ext
      var filenameArray = filename.split('.');
      var originalExt = filenameArray[filenameArray.length - 2];

      // Decrypt JSON files
      if (originalExt === 'json') {
        var object = JSON.parse(fs.readFileSync(dirname + filename, 'utf8'));
        var decrypted = cryptoJSON.decrypt(object, key, { algorithm: 'camellia-128-cbc' });

        // Save
        var jsonname = filename.replace('.enc', '');
        fs.writeFileSync(dirname + jsonname, JSON.stringify(decrypted, null, 4));

        return;
      }

      // Decrypt ENV files
      if (originalExt === 'env') {
        // Convert ENV files to JSON
        var object = envfile.parseFileSync(dirname + filename);

        // Decrypt JSON
        var decrypted = cryptoJSON.decrypt(object, key, { algorithm: 'camellia-128-cbc' });

        // Convert back into ENV format
        var decryptedEnv = envfile.stringifySync(decrypted);

        // Save ENV
        var envname = filename.replace('.enc', '');
        fs.writeFileSync(dirname + envname, decryptedEnv);

        return;
      }
    });
  });
});
