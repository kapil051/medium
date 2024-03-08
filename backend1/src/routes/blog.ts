import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify} from "hono/jwt"
import { createblogInput,updateblogInput } from "@kapil_kant/medium-common";


export const blogRouter=new Hono<{
    Bindings:{
      DATABASE_URL:string,
    }
    Variables:{
        userId:string,
    }
}>();

blogRouter.use('/*', async (c, next) => {

      const header=c.req.header("authorization")||"";

         if(!header){
            return c.text("invalid jwt token");
         }

            try{

              const responce=await verify(header,"secret");
       
              if(responce){
                    c.set("userId",responce.id);
                        await next();
              }else{
                return c.json({
                  "msg":"unauthorized user"
                 })
              }

            }catch(e){
              return c.text("invalid jwt token");
            }
  
})

blogRouter.post('/', async(c) => {

          const body=await c.req.json();
          const authorId=c.get("userId");

     const {success}=createblogInput.safeParse(body);
     
         if(!success){
                 c.status(411);
             return c.text("please provide valid content and title for blogpost");    
         }

    const prisma = new PrismaClient({     
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())   

         try{

          const blog=await prisma.post.create({
        
            data:{
                title:body.title,
               content:body.content,
                authorId:authorId,
            }

               
        })

          return c.json({
             blog
           })

         }catch(e){
            return c.text("error while creating a blog");
         }

})

blogRouter.put('/', async(c) => {

                const body=await c.req.json();
          const {success}=updateblogInput.safeParse(body); 

             if(!success){
                  c.status(411);
                return c.text("please provide valid content and title and id as update the blogpost");   
             }
       
       const prisma = new PrismaClient({     
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate()) 

          try{

            const updatedBlog=await prisma.post.update({

              where:{
                 //provide id of the blog in the body
                 //and token as authorisation
                id:body.id,
              },        
               data:{
                 title:body.title,
                 content:body.content,
               }
             }
            )
          
            return c.json({
                updatedBlog
            })

          }catch(e){
                  console.log(e);
                 return c.text("error while updating the blog providing id of blog and token of the user!");
          }
})

blogRouter.get('/bulk', async(c) => {

  const prisma = new PrismaClient({     
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate()) 

      try{

        const allBlogs=await prisma.post.findMany();

        return c.json({
             allBlogs,
        })

      }catch(e){
                console.log(e);
           return c.text("error while fiding bulk blogs providing token of the user");  
      }
      
})

blogRouter.get('/:id', async(c) => {

      const myId=c.req.param('id');
 
  const prisma = new PrismaClient({     
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate()) 

     try{

      const blog= await prisma.post.findUnique({
  
        where:{
          id:myId,
        }
        
    })
 
          return c.json({
             blog, 
          })

     }catch(e){
          console.log(e);
          return c.text("error while getting a post for the post id providing post id");
     }

})


