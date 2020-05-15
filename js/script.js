
var issueList={
    issues:[],
  
    
    addIssue:function(issueText){
        this.issues.push({
            issueText:issueText,
            completed:false
        });
    },
    
   changeIssue: function(position, issueText){
        this.issues[position].issueText=issueText;
    },
    
    deleteIssue:function(position){
        this.issues.splice(position,1);
    },
    
    toggleComplete:function(position){
        var issue=this.issues[position];
        issue.completed=!issue.completed;
    },
    
   toggleAll: function(){
        var totalIssues=this.issues.length;
        var completedIssues=0;
        // get the total completed issues
        for(var i=0;i<totalIssues;i++){
            if(this.issues[i].completed===true){
                completedIssues++;
            }
        }
        // Case 1: if everything is true, make everything false
        if(totalIssues===completedIssues){
            for(var i=0;i<totalIssues;i++){
                this.issues[i].completed=false;
            }
        }
        // Case 2: otherwise make everything true
        else{
            for(var i=0;i<totalIssues;i++){
                this.issues[i].completed=true;
            } 
        }
    }
    
};

  var handlers={
    displayIssues:function(){
        issueList.displayIssues();
    },
    
    toggleAll:function(){
        issueList.toggleAll();
        view.displayIssues();

    },
      
    addIssue:function(){
        var addIssueText = document.getElementById('addIssueText');
        issueList.addIssue(addIssueText.value);
        view.displayIssues();
        addIssueText.value='';
    },
      
    changeIssue:function(){
        var changeIssuePositionInput=document.getElementById('changeIssuePositionInput');
        var changeIssueTextInput=document.getElementById('changeIssueTextInput');
        issueList.changeIssue(changeIssuePositionInput.valueAsNumber,changeIssueTextInput.value);
        view.displayIssues();
        changeIssuePositionInput.value='';
        changeIssueTextInput.value='';
    },
      
    deleteIssue:function(position){
//        var deleteIssuePositionInput=document.getElementById('deleteIssuePositionInput');
        issueList.deleteIssue(position);
        view.displayIssues();
//        deleteIssuePositionInput.value='';
    },
      
    toggleComplete:function(){
        var toggleIssuePositionInput=document.getElementById('toggleIssuePositionInput');
        issueList.toggleComplete(toggleIssuePositionInput.value);
        view.displayIssues();
        toggleIssuePositionInput.value='';
    }
};

var view = {
    displayIssues :  function () {
        var issueUl = document.querySelector('ul');
    
        issueUl.innerHTML = '';
        
        for(var i=0; i<issueList.issues.length;i++){
            var issueLi = document.createElement('li');
            var issue = issueList.issues[i];
            var issueTextWithCompletion = '';
            if(issue.completed === true){
                issueTextWithCompletion = '(X)'+issue.issueText;
            }
            else{
                issueTextWithCompletion = '()'+issue.issueText;
            }
            issueLi.id = i;
            issueLi.textContent = issueTextWithCompletion;
            issueLi.appendChild(view.createDeleteButton());
            issueUl.appendChild(issueLi);
        }
        
    },
    
    createDeleteButton:function(){
        var deleteButton;
        deleteButton = document.createElement('button');
        deleteButton.textContent='X';
        deleteButton.className='deleteIssue';
        return deleteButton;
    },
    
    setUpEventListener: function(){
        var issuesUl =  document.querySelector('ul');
        issuesUl.addEventListener('click',function(event){
        // get the target element that is clicked
        var elementClicked =  event.target;
        // check if element clicked is deleteIssue button
        if(elementClicked.className === 'deleteIssue'){
            // call handlers deleteIssue method
            handlers.deleteIssue(parseInt(elementClicked.parentNode.id));
        }
        });
    }
};

view.setUpEventListener();