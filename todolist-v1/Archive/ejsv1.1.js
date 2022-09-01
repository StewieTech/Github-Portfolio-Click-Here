<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>To Do List</title>
    <link rel="stylesheet" href="css/styles.css">
  </head>
  <body>

    <div class="box" id = "heading">
        <h1> <%= listTitle %></h1>
    </div>>

    <div class="box">
        <%   for (var i = 0; i <= newListItems.length; i++) { %>
            <div class = "item">
                <input type="checkbox">
            <p> <%= newListItems[i] %> </p> 
            </div>
       <% } %>
       <form action="/" method="post" class="item">
        <input type="text" name="newItem" placeholder="New item">
        <button type="submit" name="button">+</button>

    </form>
    </div>



  


            
  




<!-- <% if (kindOfDay === "Saturday" || kindOfDay === "Sunday") { %>
    <h1 style ="color: purple"><%= kindOfDay%> To Do List </h1>
<% } else { %>
    <h1 style ="color: blue"><%= kindOfDay%> To Do List</h1>
<% } %> -->
     

  </body>
</html>
