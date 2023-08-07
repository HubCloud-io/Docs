var vueApp = new Vue({
    el: '#root',
    data: {
     isWaiting: false,
    },
    methods: {
     
      onStartWorkflowClick: function(){
          
          var config={
              name: "currency_rate",
              parameters: {
                  "currency":"euro"
              }
          };
          
            var payload = JSON.stringify(config);
           
           console.log(payload);
           var url = "/api/v1/workflowinner/start/";
           
           this.sendRequest(url, "POST", payload, 
                function(responseData){
                    
                    console.log("start workflow", responseData);
                    
                    if (responseData.isOK){
                        
                        makeToast(responseData.message, "success");
  
                    }
                    else{
                        makeToast(responseData.message, "danger");
                    }
                    this.isWaiting = false;
                    
                }.bind(this), 
                function(jqXHR, textStatus, errorThrown){
                    
                     console.log( textStatus, errorThrown);
                     makeToast(textStatus, "danger");
                     this.isWaiting = false;
                    
                }.bind(this));
         
      },
      onAwaitWorkflowClick: function(){
         
          var config={
              name: "currency_rate",
              resultStepName: "http",
              parameters: {
                  "currency":"usd"
              }
          };
          
            var payload = JSON.stringify(config);
           
           console.log(payload);
           var url = "/api/v1/workflowinner/await/";
           
           this.sendRequest(url, "POST", payload, 
                function(responseData){
                    
                    console.log("await workflow", responseData);
                    
                    if (responseData.isOK){
                        
                        makeToast(responseData.message, "success");
  
                    }
                    else{
                        makeToast(responseData.message, "danger");
                    }
                    this.isWaiting = false;
                    
                }.bind(this), 
                function(jqXHR, textStatus, errorThrown){
                    
                     console.log( textStatus, errorThrown);
                     makeToast(textStatus, "danger");
                     this.isWaiting = false;
                    
                }.bind(this));
         
      },
      
      sendRequest(url, reqType, dataSend, doneCallback, failCallback) {
    
            $.ajax({
                    url: url,
                    type: reqType,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: dataSend
                })
                .done(doneCallback)
                .fail(failCallback);
    
      }, // sendRequest
      
      makeToast: function(text, alertClass, fadeTime = 5000){
            
            var template = "<div id='toastAlert' class='alert alert-%class% alert-dismissable' style='width:300px; position:fixed; top:20px; right:50px;z-index:9999;'><a href= '#' class='close' data-dismiss='alert' aria-label='close' >&times; </a><span>%text%</span></div>";
            template = template.replace("%text%", text);
            template = template.replace("%class%", alertClass);
    
            $("#toastAlert").remove();
            $("body").append(template);
    
            if (fadeTime > 0) {
                $("#toastAlert").fadeOut(fadeTime);
            }
            
      }, // makeToast
        
    }
  });