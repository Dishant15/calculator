$(document).ready(function() {
  var $display = $("#display");
  var val1 = null;
  var sign = null;
  var temp = "";
  var dotUsed = false;

var showThis = function(input){
  var $display = $("#display");
  if(input.length > 16){
    $display.text("Error Overflow");
    temp = "0";
  }else {
    $display.text(input);
  }
}

  var numButtonClick = function() {
    var $this = $(this);
    var clicked = $this.text();

    // double dot protection
    if (clicked == ".") {
      if (dotUsed) {
        return;
      }
      dotUsed = true;
    }
    if (temp == "0") {
      temp = "";
    }
    temp = temp + clicked;
    showThis(temp);
  };

  var doMath = function() {
    if (val1 == null || sign == null || temp == "") {
      return null;
    }
    var ans
    if (sign == "%") {
      ans = val1 % Number(temp);
    } else if (sign == "/") {
      ans = val1 / Number(temp);
    } else if (sign == "*") {
      ans = val1 * Number(temp);
    } else if (sign == "-") {
      ans = val1 - Number(temp);
    } else if (sign == "+") {
      ans = val1 + Number(temp);
    }
    // at the end of computation be ready for next    
    return ans;
  }

  var resetAll = function() {
    val1 = null;
    dotUsed = false;
    sign = null;
    temp = "0";
    showThis(temp);
  }

  var equalTo = function() {
    var ans = doMath();
    if (ans == null) {
      resetAll();
    } else {
      temp = "";
showThis(ans.toString());
      val1 = null;
    }
  }

  var signButtonClick = function() {
    if (val1 == null && temp == "") {
      // case 1 pressed sign with nothing on screen
      resetAll();
      return;
    } else if (val1 == null) {
      // case 2 assign val1 and sign
      val1 = Number(temp);
      dotUsed = false;
      temp = "";
      var clicked = $(this).attr('sign');
      sign = clicked;
    } else {
      // case 3 complete math for val1 and 2 with old sign and asign answer to val1,new sign and val2 nill
      // case where continuos addition flow is going on
      val1 = doMath();
      $display.text(val1.toString());
showThis(val1.toString());
      dotUsed = false;
      temp = "";
      var clicked = $(this).attr('sign');
      sign = clicked;
    }
  };
  
  var clear = function(){
    temp = "0";
showThis(temp);
  }

  $(".btn-warning").click(numButtonClick);
  $(".btn-primary").click(signButtonClick);
  $("#reset").click(resetAll);
  $("#equals").click(equalTo);
  $("#clear").click(clear);
});