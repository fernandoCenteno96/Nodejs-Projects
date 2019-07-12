'use strict'
var Project=require('../models/project');

 var controller ={
    home:function(req,res){
        return res.status(200).send({
           message:"soy la home"
         } );

    },
    test:function(req,res){
        return res.status(200).send({

         message:"Soy el metodo o accion test del controlador de projects"
    });
    
    }, 
    saveProject: function(req,res){
        var project = new Project();
        var param =req.body;
        
        project.name=param.name;
        project.description=param.description;
        project.category=param.category;
        project.year=param.year;
        project.langs=param.langs;
        project.image=null;
        
        project.save((err,projectStored) =>{
            if(err) return res.status(500).send({message:"error al guardar"});

            if(!projectStored) return res.status(404).send({message:"no se a podido guardar"});

            return res.status(200).send({project: projectStored});

        });

    }

 };

 module.exports=controller;