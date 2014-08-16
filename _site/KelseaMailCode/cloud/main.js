Parse.Cloud.define("hello", function(request, response) {
    var sendgrid = require("sendgrid");
    sendgrid.initialize("zkwentz", "chimpies429");

    var name = request.params.name;
    var email = request.params.email;
    var message = request.params.message;

    if (name == "")
    {
      response.error("Your name can't be blank.");
      return;
    }

    if (message == "")
    {
      response.error("Your message can't be blank.");
      return;
    }

    if (email == "")
    {
      response.error("Your email can't be blank.");
      return;
    }

    var myRe = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$", "i");
    var myArray = myRe.exec(email);
    if (myArray == null)
    {
      response.error("Your email, '"+email+"', does not look correct.");
      return;
    }

    sendgrid.sendEmail({
      to: "kelseaeverett@gmail.com",
      from: email,
      subject: "kelsea.io [Contact Form]",
      text: "Name: "+name+"\nEmail: "+email+"\n=============\n\n"+message
    }, {
      success: function(httpResponse) {
        console.log(httpResponse);
        response.success("Email sent!");
      },
      error: function(httpResponse) {
        console.error(httpResponse);
        response.error("Uh oh, something went wrong");
      }
    });
});
