
                const express = require('express');
                const { DefaultDeserializer } = require('v8');

                const app = express(); // eslint-disable-line
                const port = 4000; // default port

                const users =[

                {id: 1, name: 'vignesh', email: `vigneshn877@gmail.com`},

                {id: 2, name: 'Jane', email: `jane@gmail.com`},


                ];



               app.get('/users',(req,res)  =>{
                   res.json(users);
               });





                app.listen(4000, () => console.log('this is a user function call command line '));