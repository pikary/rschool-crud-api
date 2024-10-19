import {createServer,IncomingMessage,ServerResponse} from 'http'

const PORT = 3000

const server = createServer((req,res)=>{

})
server.listen(PORT, ()=>{
    console.log(
        'Server started on port ' + PORT
    )
})