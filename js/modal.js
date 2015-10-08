(function(){
    this.Modal = function(){
        
        this.closeBtn = null;
        this.modal = null;
        this.overlay = null;
        // this.content = "";
        // this.contentHolder = null;
        // this.modalBody = null;

        this.transitionEnd = transitionSelected();

        var defaults = {
            autoOpen: false,
            className: "animated-drop",
            closeBtn: true,
            content: "",
            overlay: true
        };   
        if (arguments[0] && typeof(arguments[0]) === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

        Modal.prototype.open = function(){
            
            buildModal.call(this);
            var _this = this;
            // initializeEvents.call(this);
            if(this.closeBtn){
                this.closeBtn.addEventListener("click",this.close.bind(this));
            }
            window.getComputedStyle(this.modal).height;
            
            this.overlay.className += " modal-open";
            this.modal.className += " modal-open";
        }

        Modal.prototype.close = function(){
            var _this = this;
            _this.modal.className = _this.modal.className.replace("modal-open", "");
            _this.overlay.className = _this.overlay.className.replace("modal-open", "");
            
            _this.modal.addEventListener(this.transitionEnd,function(){
                console.log(_this.transitionEnd);
                if(_this.modal.parentNode){
                    _this.modal.parentNode.removeChild(_this.modal); 
                } 
            });
            _this.overlay.addEventListener(this.transitionEnd,function(){
                if(_this.overlay.parentNode){
                    _this.overlay.parentNode.removeChild(_this.overlay);
                }
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
            var content,contentHolder, modalBody;
            /*
             * If content is an HTML string, append the HTML string.
             * If content is a domNode, append its content.
            */

            if (typeof(this.options.content) === "string") {
                content = this.options.content;
            }
            else{
                content = this.options.content.innerHTML;
            }

            modalBody = document.createDocumentFragment();
            this.modal = document.createElement("div");
            this.modal.className = "modal-body "+this.options.className;
            
            if (this.options.closeBtn === true) {
                this.closeBtn = document.createElement("button");
                this.closeBtn.className = "modal-close closebtn";
                //this.closeButton.innerHTML";
                this.modal.appendChild(this.closeBtn);
            }

            if(this.options.overlay === true){
                this.overlay = document.createElement("div");
                this.overlay.className = "overlay modal-overlay";
                modalBody.appendChild(this.overlay);
            }

            contentHolder = document.createElement("div");
            contentHolder.className = "modal-content";
            contentHolder.innerHTML = content;
            this.modal.appendChild(contentHolder);

            modalBody.appendChild(this.modal);
            document.body.appendChild(modalBody);
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
            var t,
                el = document.createElement("div");
            var transitions = {
                "transition"      : "transitionend",
                "OTransition"     : "oTransitionEnd",
                "MozTransition"   : "transitionend",
                "WebkitTransition": "webkitTransitionEnd"
            };
            for(t in transitions){
                if(el.style[t] !== undefined){
                    return transitions[t];
                }
            }
        }
    }
}());