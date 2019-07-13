'use strict'
var Project=require('../models/project');
var fs =require('fs');
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

    }, 
    getProject: function(req,res){
        var projectID=req.params.id;
        console.log(projectID);
        if(projectID==null)return res.status(404).send({message:"el proyecto no existe"});

        Project.findById(projectID,(err,project)=>{
            if(err)return res.status(500).send({message:"error al devolver los datos"});
           
            if(!project) return res.status(404).send({message:"el proyecto no existe"});

            return res.status(200).send({
                project
            });

        });

    },
    getProjects: function(req,res){
        Project.find({}).sort('-year').exec((err,projects)=>{
           if(err)return res.status(500).send({message:"error al devolver los datos"});
            
           if(!projects)return res.status(404).send({message:"no hay proyectos para mostrar"});

           return res.status(200).send({ projects});
       
        });


    },
    updateProject:function(req,res){
        var projectId=req.params.id;
        var update=req.body;
        Project.findByIdAndUpdate(projectId,update,{new:true},(err,projectUpdated) => {
            if(err) return res.status(500).send({message:"error al actualizar"});
            if(!projectUpdated) return res.status(404).send({message:"no existe el proyecto para actualizar"});

            return res.status(200).send({
                project:projectUpdated
            });

        });


    },
    deleteProject: function(req,res){
        var projectId= req.params.id;

        Project.findByIdAndRemove(projectId,(err,projectRemove)=>{
            if(err) return res.status(500).send({message:"no se ha podido borrar"});
            if(!projectRemove) return res.status(404).send({message:"el proyecto no existe "});

            return res.status(200).send({
                project: projectRemove
            });
        })
    },
    uploadImeg: function(req,res){
        var projectId=req.params.id;
        var fileName='Imagen no subida..';

        if(req.files){
         var filePath=req.files.image.path;
         var fileSplit = filePath.split("\\");
         var fileName=fileSplit[1];
         var extSplit =fileName.split("\.");
         var fileExt = extSplit[1];
         if(fileExt=='png' || fileExt == 'jpg' || fileExt=='jpeg' || fileExt=='gif' ){

         Project.findByIdAndUpdate(projectId,{image:fileName},{new:true},(err,projecUpdate)=>{
            if(err)return res.status(200).send({message:"la imagen no se ha subido"});
                if(!projecUpdate) return res.status(404).send({message:"el proyecto no existe"});

                 return res.status(200).send({

                 project:projecUpdate
                    });

                    });
            }else {
                fs.unlink(filePath,(err)=>{
                return res.status(200).send({message:"la extencion no es valida"});

            });

            }
        }else{
            return res.status(200).send({message : fileName}); 
        }
    

    }


 };

 module.exports=controller;