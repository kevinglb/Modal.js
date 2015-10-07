(function(){
    this.Modal = function(){
        
        this.closeBtn = null;
        this.modal = null;
        this.overlay = null;
        this.content = "";
        this.contentHolder = null;
        this.modalBody = null;

        this.transitionEnd = transitionSelected();

        var defaults = {
            autoOpen: false,
            className: "",
            closeBtn: true,
            content: "",
            overlay: true
        };   
        if (arguments[0] && typeof(arguments[0]) === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

        Modal.prototype.open = function(){
            buildModal.call(this);
            // initializeEvents.call(this);
            if(this.closeBtn){
                this.closeBtn.addEventListener("click",this.close.bind(this));
            }
            window.getComputedStyle(this.modal).height;
            this.modal.className = this.modal.className+" modal-open";
            this.overlay.className = this.overlay.className + " modal-open";

        }
        Modal.prototype.close = function(){
            var _this = this;
            this.modal.className = this.modal.className.replace("modal-open", "");
            this.overlay.className = this.overlay.className.replace("modal-open", "");
            
            this.modal.addEventListener(this.transitionEnd,function(){
                console.log(this.transitionend);
                _this.modal.parentNode.removeChild(_this.modal);  
            });

            this.overlay.addEventListener(this.transitionEnd,function(){
                if(_this.overlay.parentNode)
                    _this.overlay.parentNode.removeChild(_this.overlay);
            });
        }

        Modal.prototype.changeContent = function(content){
            if(this){
                if(typeof content == "string"){
                    this.options.content = content;
                }
                else{
                    this.content = this.options.content.innerHTML;
                }
            }
            else{
                console.log("no modal found");
            }
        }

        function buildModal(){
            // var content,contentHolder, modalBody;
            /*
             * If content is an HTML string, append the HTML string.
            * If content is a domNode, append its content.
            */

            if (typeof(this.options.content) === "string") {
                this.content = this.options.content;
            }
            else{
                this.content = this.options.content.innerHTML;
            }

            this.modalBody = document.createDocumentFragment();

            this.modal = document.createElement("div");
            this.modal.className = "modal-body ";
            

            if (this.options.closeBtn === true) {
                this.closeBtn = document.createElement("button");
                this.closeBtn.className = "modal-close closebtn";
                //this.closeButton.innerHTML";
                this.modal.appendChild(this.closeBtn);
            }

            if(this.options.overlay === true){
                this.overlay = document.createElement("div");
                this.overlay.className = "overlay modal-overlay";
                this.modalBody.appendChild(this.overlay);
            }

            this.contentHolder = document.createElement("div");
            this.contentHolder.className = "modal-content";
            this.contentHolder.innerHTML = this.content;
            this.modal.appendChild(this.contentHolder);

            this.modalBody.appendChild(this.modal);
            document.body.appendChild(this.modalBody);
        }

        function extendDefaults(source, properties) {
            var property;
            for (property in properties) {
                if (properties.hasOwnProperty(property)) 
                    source[property] = properties[property];
      
            }
            return source;
        }

        function initializeEvents(){
            if(this.closeBtn){
                this.closeBtn.addEventListener("click",this.close.bind(this));
            }
            // if(this.overlay){
            //     this.overlay.addEventListener("click",this.close.bind(this));
            // }

        }

        function transitionSelected(){
            var el = document.createElement("div");
            if(el.style.WebkitTransition)
                return "webkitTransitionEnd";
            if(el.style.OTransition)
                return "oTransition";
            return "transitionend";
        }
    }
}());