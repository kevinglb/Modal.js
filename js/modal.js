(function(){
    this.Modal = function(){
        var doc = document;
        var buttonList = Array.prototype.slice.call(doc.querySelectorAll('button'));
        console.log(buttonList);
        this.closeBtn = null;
        this.modal = null;
        this.overlay = null;
        // this.content = "";
        // this.contentHolder = null;
        // this.modalBody = null;
        this.transitionEnd = transitionSelected();

        var defaults = {
            autoOpen: false,
            type: "animated-drop",
            closeBtn: true,
            content: "",
            overlay: true
        };   
        if (arguments[0] && typeof(arguments[0]) === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

        Modal.prototype.open = function(index){
            buildModal.call(this,index);
            var _this = this;
            // initializeEvents.call(this);
            if(_this.closeBtn){
                _this.closeBtn.addEventListener("click",_this.close.bind(_this));
            }
            window.getComputedStyle(_this.modal).height;
            
            _this.overlay.className += " modal-open";
            _this.modal.className += " modal-open";
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

        function buildModal(index){
            var content,
                contentHolder, 
                modalBody,
                type,
                container;

            var _this = this;

            container = Array.prototype.slice.call(doc.getElementsByClassName('modal-wrap'))[index-1];
            console.log(container);
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

            modalBody = doc.createDocumentFragment();
            console.log(modalBody);
            _this.modal = doc.createElement("div");
            _this.modal.className = "modal-body "+this.options.type;
            
            if (_this.options.closeBtn === true) {
                _this.closeBtn = document.createElement("button");
                _this.closeBtn.className = "modal-close closebtn";
                //this.closeButton.innerHTML";
                _this.modal.appendChild(_this.closeBtn);
            }

            if(_this.options.overlay === true){
                _this.overlay = document.createElement("div");
                _this.overlay.className = "overlay modal-overlay";
                modalBody.appendChild(_this.overlay);
            }

            contentHolder = document.createElement("div");
            contentHolder.className = "modal-content";
            contentHolder.innerHTML = content;
            _this.modal.appendChild(contentHolder);

            modalBody.appendChild(_this.modal);

            // document.body.appendChild(modalBody);
            container.appendChild(modalBody);
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
            var _this = this;
            if(_this.closeBtn){
                _this.closeBtn.addEventListener("click",_this.close.bind(_this),false);
            }
            // if(this.overlay){
            //     this.overlay.addEventListener("click",this.close.bind(this));
            // }
        }
        //determine with transitionend it has
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
        buttonList.forEach(function(btn){
            btn.addEventListener("click",function(e){
                console.log("click");
                var i = btn.getAttribute("data-target");
                console.log(i);
                //window.myModal_drop.open();
            },false);
        });
        
    }
}());