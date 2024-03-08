import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from "hono/jwt"
import {signupInput,signinInput} from "@kapil_kant/medium-common";


  export const userRouter=new Hono<{
      Bindings:{
        DATABASE_URL:string,
        MY_SECRET:string,
      }
  }>();

userRouter.post('/signup', async(c) => {

    const prisma = new PrismaClient({     
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

        const body=await c.req.json();

        const {success}=signupInput.safeParse(body);

           if(!success){
                   c.status(411);
               return c.text("provide valid email and password for signup");
           }
  
            try{
  
              const newUser=await prisma.user.create({
                data:{
   
                      email:body.email,
                      password:body.password,
                }
             })
   
            const token= await sign({id:newUser.id},c.env.MY_SECRET);
   
              return c.json({
                  token
                 })
  
            }catch(e){
              
                 return c.text("email already exists");
  
            }
  
         
  })

  
userRouter.post('/signin', async(c) => {
  
    const prisma = new PrismaClient({     
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
        const body=await c.req.json();

         const {success}=signinInput.safeParse(body);
 
             console.log(success);

             if(!success){
                          c.status(411);
                 return c.text("please provide valid email and password for signin password length atleast 6 chars");  
             }
  
          
         const userFound=await prisma.user.findUnique({
               where:{
                  email:body.email,
                  password:body.password,
               }
           })
  
           if(!userFound){
                return c.json({
                    "msg":"user not found",
                })
           }
  
            const token= await sign({id:userFound.id},c.env.MY_SECRET);
  
           return c.json({

              token,
           })
})

userRouter.get('/allusers',async(c)=>{

  const prisma = new PrismaClient({     
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

   try{    
    const allUsers=await prisma.user.findMany();
       return c.json({
           allUsers,
       })

   }catch(e){
        return c.text("error to find all the users");
   }

  })