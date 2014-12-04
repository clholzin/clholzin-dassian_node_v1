var App = {};

App.init = function() {
  // Create the app view
   new App.TasksView({ collection: tasks });
   // Create the router
   var router = new App.Router;
   $('input.hide').hide();

   dataRequest();

$('#target-element-id').on('click','a.product',function(event){
    event.preventDefault();
    //var target = $(event.currentTarget);
    var id = $(this).data('id');
    console.log(id);
    $.ajax({
      url:'https://cors-anywhere.herokuapp.com/services.odata.org/Northwind/Northwind.svc/'+id,
      type:'GET',
      dataType:'json',
      headers: {  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type,maxdataserviceversion',
                  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                  'Access-Control-Expose-Headers':"cache-control,content-length,content-type,content-encoding,expires,vary,server,x-content-type-options,dataserviceversion,x-aspnet-version,x-powered-by,access-control-allow-origin,access-control-allow-methods,access-control-allow-headers,access-control-expose-headers,date,connection,x-final-url",
                  'Content-Type': 'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
                  'Accept': 'application/json,text/html'
                  },
      success:function(response){
        console.log(response.value);
        $('div#target-element-id').html('');
        var entity="";
        _.each(response.value,function(value){
          entity += '<div class="well p">'+ value.CategoryName +'</div>';
        });
        $('div#target-element-id').html(entity);
      },
      fail:function(error){
        alert('error:  '+error);
      }
    });

});

function playJson(){
    var build_data = {"d":{"results":[{"__metadata":{"id":"http://dsn-sap-dg7.dassian.loc:8000/sap/opu/odata/sap/ZUSER_SRV/USR01Set('22665')","uri":"http://dsn-sap-dg7.dassian.loc:8000/sap/opu/odata/sap/ZUSER_SRV/USR01Set('22665')","type":"ZUSER_SRV.USR01"},"Persnumber":"22665","NameFirst":"Simon","NameLast":"Pugsley","SmtpAddr":"spugsley@dassian.com"},{"__metadata":{"id":"http://dsn-sap-dg7.dassian.loc:8000/sap/opu/odata/sap/ZUSER_SRV/USR01Set('22728')","uri":"http://dsn-sap-dg7.dassian.loc:8000/sap/opu/odata/sap/ZUSER_SRV/USR01Set('22728')","type":"ZUSER_SRV.USR01"},"Persnumber":"22728","NameFirst":"Allen","NameLast":"Ytzen","SmtpAddr":"aytzen@dassian.com"},{"__metadata":{"id":"http://dsn-sap-dg7.dassian.loc:8000/sap/opu/odata/sap/ZUSER_SRV/USR01Set('23306')","uri":"http://dsn-sap-dg7.dassian.loc:8000/sap/opu/odata/sap/ZUSER_SRV/USR01Set('23306')","type":"ZUSER_SRV.USR01"},"Persnumber":"23306","NameFirst":"","NameLast":"crose@dassian.com","SmtpAddr":"crose@dassian.com"},{"__metadata":{"id":"http://dsn-sap-dg7.dassian.loc:8000/sap/opu/odata/sap/ZUSER_SRV/USR01Set('23324')","uri":"http://dsn-sap-dg7.dassian.loc:8000/sap/opu/odata/sap/ZUSER_SRV/USR01Set('23324')","type":"ZUSER_SRV.USR01"},"Persnumber":"23324","NameFirst":"Allen","NameLast":"Ytzen","SmtpAddr":"aytzen@dassian.com"},{"__metadata":{"id":"http://dsn-sap-dg7.dassian.loc:8000/sap/opu/odata/sap/ZUSER_SRV/USR01Set('23326')","uri":"http://dsn-sap-dg7.dassian.loc:8000/sap/opu/odata/sap/ZUSER_SRV/USR01Set('23326')","type":"ZUSER_SRV.USR01"},"Persnumber":"23326","NameFirst":"John","NameLast":"Gardner","SmtpAddr":"jgardner@dassian.com"}]}};
        var html = '';
          html += '<ul class="list-group">';
        _.each(build_data.d.results, function(person){
          html += '<li class="list-group-item" data-id="'+ person.Persnumber +'">';
          html += 'Info: <a href="'+ person.__metadata.uri +'?$format=json" target="_blank"><button class="btn btn-default view-model btn-sm pull-right">View</button></a><br>';
          html += 'Id: '+ person.Persnumber +'<br>';
          html += 'First Name: '+ person.NameFirst +'<br>';
          html += 'Last Name: '+ person.NameLast +'<br>';
          html += 'Email: '+ person.smtpAddr;
          html += '</li>';
            //console.log(JSON.stringify(person));
        });
          html += '</ul>';
        $('div#target-element-id').html(html);
        };
}



//http://dsn-sap-dg7.dassian.loc:8000/sap/opu/odata/sap/ZUSER_SRV/USR01Set/
//netflix.com/v2/Catalog/Genres?$format=json
//http://dsn-sap-dg7.dassian.loc:8000/sap/opu/odata/sap/ZUSER_SRV/USR01Set?$format=json&sap-ds-debug=true&$filter=startswith(NameFirst,A)&$skip=12&$top=5
//http://odata.dsn-sap-dg7.dassian.loc:8000/sap/opu/odata/sap/ZUSER_SRV/USR01Set?$format=json&$top=5
//http://services.odata.org/OData/OData.svc/Categories?$format=json
//http://wddg7.dassian.com:8100/sap/opu/odata/sap/ZUSER_SRV/USR01Set?$format=json WORKS
//https://cors-anywhere.herokuapp.com/services.odata.org/Northwind/Northwind.svc/
function dataRequest(){
  var build = '';
  OData.read({
    requestUri: "http://wddg7.dassian.com:8100/sap/opu/odata/sap/ZUSER_SRV/USR01Set?$format=json",
    method: "GET",
    enableJsonpCallback: false,
    datatype: "json",
    user: 'cholzinger',
    password: 'Welcome14',
    headers: {    'Access-Control-Allow-Origin':'*',
                  'Access-Control-Allow-Headers':'X-Requested-With, Content-Type, Accept, access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type,maxdataserviceversion',
                  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE',
                  'Access-Control-Expose-Headers':"cache-control,content-length,content-type,content-encoding,expires,vary,server,x-content-type-options,dataserviceversion,x-aspnet-version,x-powered-by,access-control-allow-origin,access-control-allow-methods,access-control-allow-headers,access-control-expose-headers,date,connection,x-final-url",
                  'Content-Type': 'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
                  'Accept': 'application/json,text/html'
                  }
              },
    function (data, response) {
      //console.log(JSON.stringify(data.workspaces[0].collections));
      //data.d.results
        _.each(data.d.results, function(person){
          build += '<div class="well p">';
          //build += 'Title: <a href="javascript:;" class="product" data-id="'+ product.title +'">'+ product.title +'</a>'; //data.workspaces[0].collections
          build += 'Id: '+ person.Persnumber +'<br>';
          build += 'First Name: '+ person.NameFirst +'<br>';
          build += 'Last Name: '+ person.NameLast +'<br>';
          build += 'Email: '+ person.smtpAddr;
          build += '</div>';
            //console.log(JSON.stringify(person));
        });
        $('div#target-element-id').html(build);
      console.log("Operation succeeded.");
    }, function (err) {
      console.log(err);
      alert("Error occurred " + err.message);
    });





  /**$.ajax({
    url: "http://odata.netflix.com/v2/Catalog/Genres?$format=json",//?$format=json
    contentType: 'application/json; charset=utf-8',
    type: 'GET',
    xhrFields: {
      withCredentials: false
    },
     headers: {
       Accept: "application/json",
       "Access-Control-Allow-Headers",
       "Origin, X-Requested-With, Content-Type, Accept"
    // Set any custom headers here.
    // If you set any non-simple headers, your server must include these
    // headers in the 'Access-Control-Allow-Headers' response header.
  },
    dataType: 'jsonp',
    error: function (xhr, status) {
        alert(status);
    },
    done: function (result) {
        console.log('result');
      var echo = '';
        echo += '<ul>';
          _.each(results, function(result){
            echo += '<li>'+result+'</li>';
        });
          echo += '</ul>';
          $('div#target-element-id').html('echo');

    }
});//ajax request**/

/**
OData.read({requestUri:"http://odata.netflix.com/v2/Catalog/Genres?$format=json",
  headers: { Accept: "application/json; charset=utf-8" }},
  function (data, request) {
    var html = "";
    for (var i = 0; i < data.results.length; i++) {
      html += "<li>" + data.results[i].Name + "</li>";
    }
    document.getElementById("target-element-id").innerHTML = html;
  }, function(err){
    console.log(err);
    alert("Error occurred " + err.message);
    $('#target-element-id').html('No Netflix Results...');
});//END ODATA**/
};

App.Task = Backbone.Model.extend({
  idAttribute: "_id",
  default: function (){
    title:undefined;
  },
  initialize: function () {
    this.on('error', this.showError);
    this.bind('remove', this.removeTask);
  },
  validate: function(attrs) {
    if (!attrs.title) {
      return "Please enter a task";
    }
  },
  showError: function (model, error) {
    console.log('removed task')
    //alert('Removed Task');
  },
  removeTask: function () {
    this.destroy();
  }
});

App.Tasks = Backbone.Collection.extend({
  model: App.Task,
  url: '/api/tasks'
});

App.TasksView = Backbone.View.extend({
  el: $("#tasks"),
  initialize: function() {
    this.task_form = _.template($('#task_form').html());
    this.tasks_template = _.template($('#tasks_template').html());
    this.task_template = _.template($('#task_template').html());
    model_template = _.template($('#model_template').html());
    this.render();
  },
  render: function() {
    $(this.el).html(this.tasks_template({
      task_form: this.task_form,
      tasks: this.collection.models,
      task_template: this.task_template,
      model_template: this.model_template
    }));
  },
  events : {
    'submit form'   : 'createTask',
    'click button.update' : 'changeDiv',
    'click button.send'   : 'updateTask',
    'click button.view-model'   : 'userModel',
    'click .delete' : 'deleteTask'
  },
  userModel: function (event) {
    event.preventDefault();
    var userLi = this.$(event.currentTarget).parent();
    console.log(userLi);
    var id = userLi.data('id');
    console.log(id);
    var user = build_data.d.results[0];
    var userid_template = _.template($('#model_template').html({user:user}));
    //$('#myModal').html(userid_template);
    //var model_template = _.template($('#model_template').html(userid_template));
    //var model_template = _.template($('#model_template').html());
    $('#myModal').modal('show');
    console.log(user);
  },
  createTask: function (event) {
    event.preventDefault();
    var taskTitleInput = $('.task-title');
    var taskTitle = taskTitleInput.val();
    tasks.create({ title: taskTitle }, {
    success: function(task){
        $('div.panel#tasks ul#tasks_list')
          .prepend("<li data-id='" + task.id + "' class='list-group-item'>"+
          "<button class='btn btn-danger delete pull-right btn-sm'>Done!</button>"+
          "<button class='btn btn-info update pull-right btn-sm' id='" + task.id + "'>update</button>"+
          "<div class='change' id='" + task.id + "'>" + taskTitle + "</div>"+
          "<input type='text' class='hide' value='" + taskTitle + "' /></li>");
        taskTitleInput.val('');
        $("li[data-id='"+ task.id +"']").hide().fadeIn('slow');
      }
    });
  },
  changeDiv: function (event) {
    event.preventDefault();
    var taskLi = this.$(event.currentTarget).parent();
    var id = taskLi.data('id');
    $('input.hide#'+id).removeClass('hide');
    $('button#'+id).removeClass('update').removeClass('btn-info').addClass('send').addClass('btn-success').text('Send');
    //$('button#'+id).addClass('send').addClass('btn-success').text('Send');
    $('.change #'+id).hide();
      console.log('hit edit: '+id);
  },
  updateTask: function (event) {
    event.preventDefault();
    console.log('hit update task: '+id);
    var taskTitleInput = $('.task-title');
    var taskTitle = taskTitleInput.val();
    var taskLi = this.$(event.currentTarget).parent();
    var id = taskLi.data('id');
    $('button#'+id).removeClass('send').removeClass('btn-success').addClass('update').addClass('btn-info').text('update');
    var taskForUpdate = tasks.get(id);
    //$(taskLi).remove();
    //tasks.remove(taskForUpdate);
    tasks.create({title: taskTitle }, {
      success: function(task){
        $('div.panel#tasks ul.list-group')
          .prepend("<li data-id='" + task.id + "'class='list-group-item'>"+
          "<button class='btn btn-danger delete pull-right btn-sm'>Done!</button>"+
          "<button class='btn btn-info update pull-right btn-sm' id='" + task.id + "'>update</button>"+
          "<div class='change' id='" + task.id + "'>" + taskTitle + "</div>"+
          "<input type='text' class='hide' value='" + taskTitle + "' /></li>");
        taskTitleInput.val('');
        $("li[data-id='"+ task.id +"']").hide().fadeIn('slow');
      }
    });
  },
  deleteTask: function (event) {
    var taskLi = this.$(event.currentTarget).parent();
    var id = taskLi.data('id');
    var taskForDeletion = tasks.get(id);
    $("li[data-id='"+ id +"']").fadeOut('slow');
    $("li[data-id='"+ id +"']").hide();
    $(taskLi).remove();
    tasks.remove(taskForDeletion);
  },

});


App.Router = Backbone.Router.extend({

    routes: {
        '':'index',
        'api/tasks':'create',
        'api/tasks':'show',
        'api/tasks/:id':'update',  // url/page.html#/articles/id
        'api/tasks/:id': 'delete' // url/page.html#/files/user1/profile.jpg
        //':route/:action': 'loadView'
    },

    index: function(){
        console.log('index');
    },

    show: function(){
        console.log('show data');
    },

    create: function(){
        console.log('create data');
        /**var addPersonView = new App.TasksView.createTask({ collection: tasks });
        peopleView = new App.Views.render({ collection: tasks });**/
    },

    update: function(id){
        console.log('update data: ' + id);
    },

    delete: function(id){
        console.log('delete file: ' + id);
        //App.TasksView.deleteTask(id);
      }
});
