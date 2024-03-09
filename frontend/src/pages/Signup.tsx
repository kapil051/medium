import { Quote } from "../components/Quote"

export const Signup=()=>{
    return(
      <>

          <div className=" grid grid-cols-2 " >

              <div className="bg-slate-300 flex justify-center items-center " >
                   
                       <div className=" rounded-lg shadow-md bg-slate-200 h-96 w-96 flex flex-col justify-between items-center " > 

                                  <div className=" mt-1 " >
                                    <div className=" text-3xl font-bold" > Create an Account</div>
                                    <div className=" text-md font-normal ml-3 " > Already have an account? <span>Login</span>  </div>
                                  </div>              

                                  
                                    <div>
                                        <label htmlFor="" className=" text-xl font-medium" >Email</label> <br />
                                        <input type="text" className=" w-96 mt-2 p-2 rounded-md  " placeholder="xyz@gmail.com" />
                                    </div>
                                    <div>
                                        <label htmlFor="" className=" text-xl font-medium"  >password</label> <br />
                                        <input type="text"  className="w-96 mt-2 p-2 rounded-md"  placeholder="password" />
                                    </div>

                                    <button className=" w-full text-white bg-black p-2 rounded-md m-1 " >Sign up</button>

                        </div>


              </div>

               <div>
               <Quote></Quote>
               </div>
          </div>

{/* <Quote></Quote> */}

      </>
    )
}