var gulp = require('gulp');
var crypto = require("crypto");
var encryptJs = require("encryptjs");
var through = require('through2');

gulp.task("encrypt", function(){
	console.log("encrypt_crypto");
	var secretkey='asiacrit';

	gulp.src("encrypt/*.proto")
	.pipe(through.obj(function(file, encode, cb){
		var fileContent = file.contents.toString();
		var cipher = crypto.createCipher("aes192", secretkey);
		var crypted = cipher.update(fileContent, 'utf8', 'hex');
		crypted += cipher.final('hex');
		file.contents = new Buffer(crypted)
        this.push(file);
        cb();
	}))
	.pipe(through.obj(function (file, encode, cb) {
        this.push(file);
        cb();
	}))
	.pipe(gulp.dest("entrypt_file"));
});

gulp.task("decrypt", function(){
	var secretkey='asiacrit';

	gulp.src("decrypt/*.proto")
	.pipe(through.obj(function(file, encode, cb){
		var fileContent = file.contents.toString();
		var decipher = crypto.createDecipher("aes192", secretkey);
		var decrypted = decipher.update(fileContent, 'hex', 'utf8');
		decrypted += decipher.final('utf8');
		file.contents = new Buffer(decrypted)
        this.push(file);
        cb();
	}))
	.pipe(through.obj(function (file, encode, cb) {
        this.push(file);
        cb();
	}))
	.pipe(gulp.dest("decrypt_file"));

});

