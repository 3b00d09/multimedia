// import { RealtimeChannel, createClient } from "@supabase/supabase-js";
// import { SUPABASE_URL, KEY } from "$env/static/private";
// import { json } from "@sveltejs/kit";

// export const GET = async(request) =>{
//     const supabase = createClient(SUPABASE_URL, KEY);
//     const session = request.locals.session

//     if(!session){
//         return json({})
//     }

// //     const stream = new ReadableStream({
// //     async start(controller) {

// //     },
// //     async pull(controller){
// //         setTimeout(() => {
// //             controller.enqueue("hello world")
// //         }, 1000);
// //       // Example data to stream
// //         //   supabase
// //         // .channel('notifs')
// //         // .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `target_user=eq.${session.userId.toString()}` }, (payload)=>{
            
// //         //     try{
// //         //         controller.enqueue(payload.new)
// //         //         console.log("Done")
// //         //     }
// //         //     catch(e){
// //         //         console.log(e)
// //         //     }
            
// //         // })
// //         // .subscribe()
// //     },
// //     cancel(){
// //         console.log("closed")
// //     }
// //   });

//     const ting = supabase.channel("notifs").on("postgres_changes",{event:'INSERT', schema:"public", table:"notifications", filter:`target_user=eq.${session.userId.toString()}`},(payload)=>{
//         console.log(payload.new)
//     }).subscribe()

//   const stream = new ReadableStream({
//     async start(controller) {
//       // Example data to stream
//       const data = ["Part 1", "Part 2", "Part 3"];
      
//       for (const part of data) {
//         await new Promise(() => setTimeout((), 1000)); // 1000ms delay between chunks
//         controller.enqueue(part);
//       }

//       controller.close();
//     }
//   });

  

//   return new Response(stream,{
//     headers:{"Content-Type": "text/plain"}
//   });
// }