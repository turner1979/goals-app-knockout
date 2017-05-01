define(["knockout", "text!./goals.html"], function(ko, goalsTemplate) {

  // model
  function Goal(name, completed) {
    var self = this;
    self.name = ko.observable(name);
    self.completed = ko.observable(completed);
  }

  // view model
  function GoalsViewModel(route) {

    var self = this;

    self.newGoal = ko.observable();
    self.editMode = ko.observable(false);
    self.currentGoal = null;

    self.goals = ko.observableArray([
      new Goal('Goal 1', true),
      new Goal('Goal 2', false),
      new Goal('Goal 3', false),
      new Goal('Goal 4', false)
    ]);

    self.addEditGoal = function(goal){

      if(!self.editMode()){
        if(self.newGoal()){
          self.goals.push(new Goal(goal.newGoal.value, false));
          self.newGoal(null);
        }
      }
      else {
        self.currentGoal.name(goal.newGoal.value);
        self.editMode(false);
        self.newGoal(null);
      }
    };

    self.toggleCompleted = function(){
      this.completed(!this.completed());
    };

    self.editGoal = function(){
      self.editMode(true);
      self.newGoal(this.name());
      self.currentGoal = this;
    }

    self.removeGoal = function(goal){
      self.goals.remove(goal);
    };

  }

  return { viewModel: GoalsViewModel, template: goalsTemplate };

});
