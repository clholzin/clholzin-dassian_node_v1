var App = {};


App.Task = Backbone.Model.extend({
  idAttribute: "_id",
  initialize: function () {
    this.bind('error', this.showError);
    this.bind('remove', this.removeTask);
  },
  validate: function(attrs) {
    if (!attrs.title) {
      return "Please enter a task";
    }
  },
  showError: function (model, error) {
    console.log(model)
    console.log(error)
    alert(error);
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
    console.log('task view hit')
    this.task_form = _.template($('#task_form').html());
    this.tasks_template = _.template($('#tasks_template').html());
    this.task_template = _.template($('#task_template').html());
    this.render();
  },
  render: function() {
    $(this.el).html(this.tasks_template({
      task_form: this.task_form,
      tasks: this.collection.models,
      task_template: this.task_template
    }));
  },
  events : {
    'submit form' : 'createTask',
    'click button' : 'deleteTask'
  },
  createTask: function (event) {
    event.preventDefault();
    var taskTitleInput = $('.task-title');
    var taskTitle = taskTitleInput.val();
    tasks.create({ title: taskTitle }, {
      success: function(task){
        $('#tasks ul')
          .prepend("<li data-id=" + task.id + ">" + taskTitle + " <button class='btn btn-success'>Done!</button></li>");
        taskTitleInput.val('');
      }
    });
  },
  deleteTask: function (event) {
    var taskLi = this.$(event.currentTarget).parent();
    var id = taskLi.data('id');
    var taskForDeletion = tasks.get(id);
    $(taskLi).remove();
    tasks.remove(taskForDeletion);
  },

});


App.Router = Backbone.Router.extend({

    routes: {
        '/':'index',
        'api/tasks':'create',
        'api/tasks':'show',
        'api/tasks/:id':'update',  // url/page.html#/articles/id
        'api/tasks/delete/:id': 'delete' // url/page.html#/files/user1/profile.jpg
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
/**
    loadView: function(route, action){
        console.log('load view. route: ' + route + '. action: ' + action);
    }**/

});


var tasks = new App.Tasks;
tasks.reset(!{tasks});

App.init = function() {
  new App.TasksView({ collection: tasks });
  console.log('init hit')
}


new App.Router();
Backbone.history.start({pushState: true});
