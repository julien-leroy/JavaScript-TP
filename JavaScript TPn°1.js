function EventEmitter(){
 this.callbacks = {}; 
}

EventEmitter.prototype = {

  on: function(event, fn){
    if(!this.callbacks.hasOwnProperty(event)){
    this.callbacks[event] = [];
    } 
    this.callbacks[event].push(fn);
    
    return this;
  },

  off: function(event, fn){
        
    if (!fn){
            
      if (!event){
                 
        console.log('tout les events sont suprimés');
        delete this.callbacks;
      }
      else {
        console.log('toutes les fonctions de'+ event+ 'sont éfacés');
        this.callbacks[event] = [];
      }
    }
    else {
      console.log('La fonction a été supprimé');
      this.callbacks[event].splice(this.callbacks[event].indexOf(fn), 1)
    }
    return this;
  },
  

    emit: function(event){
      // Récupérer tous les args sauf "event" dans un tableau
      var args = Array.prototype.slice.call(arguments);
      
      //shift enlève le premier élément d'un tableau
      args.shift();
      // Si "event" est présent dans this.callbacks

    if(this.callbacks.hasOwnProperty(event)){
      this.callbacks[event].forEach((function(f){
        f.apply(this, args);
      }));
    }
    
    return this;
  },
  
  once: function(event, fn){
    var n = 0;
    if(!this.callbacks.hasOwnProperty(event)){
      this.callbacks[event] = [];
    }
    
    var fnthis = this;
    var oncefn = function (){
      ++n;
      if(n == 1){
        fnthis.callbacks[event].splice((fnthis.callbacks[event].indexOf(oncefn) -1), 2);
      }
    }
    this.callbacks[event].push(fn);
    this.callbacks[event].push(oncefn);
    return this;
  },
  
  times: function(event, num, fn){
      
    if(!this.callbacks.hasOwnProperty(event)){
      this.callbacks[event] = [];
    }
    
    var fnthis = this;
    var timesfn = function (){
      num--;
      if(num === 0){
        fnthis.callbacks[event].splice(fnthis.callbacks[event].indexOf(fn), 2);
      }
    }
    this.callbacks[event].push(fn);
    this.callbacks[event].push(timesfn);
    
    return this;
  }
};

//Création des variables
var julien   = new EventEmitter();
var matthieu = new EventEmitter();
var malo     = new EventEmitter();

var fn = console.log.bind(console);

julien.on("event1", console.log.bind(console))
julien.on("event2",	console.log.bind(console))
julien.emit("event1", 1).emit("event2",2)
julien.off()
//julien.emit("event1", 1).emit("event2",2);*/

julien.on("event1", fn)
julien.on("event2",	fn)
julien.emit("event1", 1).emit("event2",	2)
julien.off("event1", fn)
julien.emit("event1", 1).emit("event2",	2)

julien.once("event", function(){console.log("Should	only be	printed	once");})
julien.emit("event");
julien.emit("event");

julien.times("event1", 2, fn)
julien.emit("event1", "hello should	be print")
julien.emit("event1", "world should	be print")
julien.emit("event1", "SHOULD NOT BE PRINTED");