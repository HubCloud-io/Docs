var vueApp = new Vue({
    el: '#root',
    data: {
      items: []
    },
    methods: {
        
      onMakeToastClick: function(){
          
          // Это наша функция глобального контекста, позволяет показывать всплывающие оповещения
          // Второй параметр может быть 'success','danger','primary', 'warning'. Это названия цветовых классов в Bootstrap
          makeToast("OK","success");
          
      },
      
      onBatchTestClick: function(){
          
         // Конфигурация для получения справочника товары.     
         var configProducts = {
             name: "products",
             expression: 'Catalog.Product | Select(id, name, title)',
             applyDimensionRights: true
         };
         
        // Конфигурация для получения справочника физлица.
        var configPersons = {
             name: "persons",
             expression: 'Catalog.Person | Select(id, name, title)',
             applyDimensionRights: true
         };
         
         var configs = [];
         configs.push(configProducts);
         configs.push(configPersons)
         
         // Перед отправкой его надо конвертировать в JSON.
         var payload = JSON.stringify(configs);
         
         console.log(payload);
        
         $.ajax({
                  // Точка API для вызова источников.
                  url: "/api/v1/datasource/executebatch/",
                  type: "POST",
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  data: payload
              })
              .done(function(responseData){
                  
                  console.log(responseData);
                  
                  if (responseData.isOK){
                      
                      makeToast("Done","success");
                   
                      console.log("batch result", responseData.data);
                  }
                  else{
                      makeToast(responseData.message, "danger");
                  }
                 
                  
              // ВАЖНО! с помощью .bind(this) дает доступ call-back функции к контексту Vue приложения.
              // Этот прием позволяет не засорять глобальный контекст.
              }.bind(this))
              .fail(function(jqXHR, textStatus, errorThrown){
                  
                  console.log( textStatus, errorThrown);
                  
              }); 
          
      },
     
      onTestClick: function(){
        
         // Объект для вызова источника.
         var config = {
             expression: 'Catalog.Product | Select(id, name, title)',
             applyDimensionRights: true
         };
         
         // Перед отправкой его надо конвертировать в JSON.
         var payload = JSON.stringify(config);
         
         console.log(payload);
        
         $.ajax({
                  // Точка API для вызова источников.
                  url: "/api/v1/datasource/execute/",
                  type: "POST",
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  data: payload
              })
              .done(function(responseData){
                  
                  console.log(responseData);
                  
                  if (responseData.isOK){
                      
                      makeToast("Done","success");
                      this.items = responseData.data;
                   
                      console.log(this.items);
                  }
                  else{
                      makeToast(responseData.message, "danger");
                  }
                 
                  
              // ВАЖНО! с помощью .bind(this) дает доступ call-back функции к контексту Vue приложения.
              // Этот прием позволяет не засорять глобальный контекст.
              }.bind(this))
              .fail(function(jqXHR, textStatus, errorThrown){
                  
                  console.log( textStatus, errorThrown);
                  
              }); 
        
      },
    }
  });