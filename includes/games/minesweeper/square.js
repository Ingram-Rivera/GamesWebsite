function rectangle(a, b, z) {
    this.a = a;
    this.b = b;
    this.x = a * z;
    this.y = b * z;
    this.z = z;
    this.countOthers= 0;
    this.bomb = false;
    this.shows = false;
}



rectangle.prototype.display = function(){
 stroke(0);
  noFill();



  rect(this.x, this.y, this.z, this.z);
  if(this.shows) {
    if (this.bomb){

      fill(200, 30, 20);
      circle(this.x + this.z * 0.5, this.y + this.z * 0.5, this.z * 0.5);



    } else {
      fill(87);

      rect(this.x, this.y, this.z, this.z);
      textAlign(CENTER);
      fill(0);
      text(this.countOthers, this.x + this.z * 0.5, this.y + this.z - 6);


    }

  }



}



rectangle.prototype.whatIsAround = function() {
  if (this.bomb) {
    this.countOthers = -1
    return;
  }
  var total = 0;
  for (var t = -1; t <= 1; t++){
    for (var u = -1; u <= 1; u++) {
      var a = this.a + t;
      var b = this.b + u;
      if (a > - 1 && a < colm && b > -1 && b < rows){
      var countOtherRec = grid[a][b];
      if (countOtherRec.bomb){
      total++;
      }
      }
    }
  }




    this.countOthers = total;
}



rectangle.prototype.whatsInsideRect = function(x, y) {
 return (x > this.x && x < this.x + this.z && y > this.y && y < this.y + this.z);


}
rectangle.prototype.displayTwo = function(x, y) {
this.shows = true;
  if(this.countOthers == 0) {
    this.fillAround();
  }
}



rectangle.prototype.fillAround = function (){



 for (var t = -1; t <= 1; t++){
    for (var u = -1; u <= 1; u++) {
      var a = this.a + t;
      var b = this.b + u;
      if (a > - 1 && a < colm && b > -1 && b < rows){
       var countOtherRec = grid[a][b];
       if (!countOtherRec.bomb && !countOtherRec.shows){
         countOtherRec.displayTwo();
      }
    }



  }
}
}
