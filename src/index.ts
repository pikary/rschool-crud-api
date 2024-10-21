import server from "./app"
import * as dotenv from 'dotenv';

dotenv.config()

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(
        'Server started on port ' + PORT
    )
})