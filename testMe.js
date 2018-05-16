function dumpDB() {
  db.all ('SELECT * FROM photoTags', dataCallback);
      function dataCallback(err,data) {
		console.log(data) 
      }
}