/*
*  This is the a view of a library (subject, directories, or local) typically within a LibraryBrowser view. 
*
*  
*/ 

define(['backbone', 'underscore','config','views/TabView','views/library-views/LibraryProblemsView','models/ProblemList'], 
function(Backbone, _,config,TabView,LibraryProblemsView, ProblemList){
    var LibraryView = TabView.extend({
        className: "library-view",
    	initialize: function (options){
    		var self = this;
            _.bindAll(this,'addProblem','loadProblems','showProblems','changeDisplayMode');
            _(this).extend(_(options).pick("problemSets","libBrowserType","settings","eventDispatcher","messageTemplate"));
            this.libraryProblemsView = new LibraryProblemsView({libraryView: this, messageTemplate: this.messageTemplate,
                     allProblemSets: this.allProblemSets, settings: this.settings})
                .on("page-changed",function(num){
                    self.tabState.set("page_num",num);
                });
            TabView.prototype.initialize.apply(this,[options]);
            this.tabState.set({library_path: "", page_num: 1, rendered: false},{silent: true});
    	},
    	events: {   
            "change .target-set": "resetDisplayModes"
        }, 
    	render: function (){
            var self = this, i;
            var modes = this.settings.getSettingValue("pg{displayModes}").slice(0); // slice makes a copy of the array.
            modes.push("None");

            // load the values stored in this.tabState;


    		this.$el.html(_.template($("#library-view-template").html(), 
                    {displayModes: modes, sets: this.problemSets.pluck("set_id")}));
            if(this.libraryTreeView){
 
                var _fields = {};
                for(i=0;i<4;i++){
                    _fields["level"+i] = this.tabState.get("library_path")[i];
                }
                this.libraryTreeView.fields.set(_fields,{silent: true});
                this.libraryTreeView.fields.on("change",function(model){
                    self.tabState.set("library_path",model.values());
                });
                this.libraryTreeView.setElement(this.$(".library-tree-container")).render();
            }
            this.libraryProblemsView.setElement(this.$(".problems-container")).render();
            if (this.libraryProblemsView.problems && this.libraryProblemsView.problems.size() >0){
                this.libraryProblemsView.renderProblems();
            } else if(this.libraryProblemsView.problems && this.rendered){
                this.libraryTreeView.selectLibrary();
            }
            return this;
    	},
        set: function(options){
            if(options.tabState){
                this.tabState = options.tabState;
            }
        },
        changeDisplayMode:function(evt){
            this.libraryProblemsView.changeDisplayMode(evt);
        },
        resetDisplayModes: function(){  // needed if there no target set was selected. 
            this.$('.target-set').css('background-color','white');
            this.$('.target-set').popover("hide");
        },
        setTargetSet: function(set){
            this.targetSet = set;
            this.libraryProblemsView.highlightCommonProblems();
        },
        addProblem: function(model){
            var problemSet = this.allProblemSets.findWhere({set_id: this.targetSet});
            if(!problemSet){
                this.$(".target-set").css("background-color","rgba(255,0,0,0.4)")
                    .popover({placement: "bottom",content: this.messageTemplate({type:"select_target_set"})}).popover("show");
                return;
            }
            problemSet.addProblem(model);
        },
        showProblems: function () {
            this.rendered = true;
            this.$(".load-library-button").button("reset");  
            this.libraryProblemsView.set({problems: this.problemList, type:this.libBrowserType})
                    .updatePaginator().gotoPage(this.libraryProblemsView.currentPage).highlightCommonProblems();
        },
    	loadProblems: function (_path){   
            this.$(".load-library-button").button("loading"); 	
    		console.log(_path);
            var self = this;
			this.problemList = new ProblemList();
            this.problemList.path=_path;
            this.problemList.type = this.libBrowserType;
            this.problemList.fetch({success: this.showProblems});
    	}
    });

    return LibraryView;
});
