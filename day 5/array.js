


const users = 

    [ {  name: 'Alice',  age:80, email: 'alice@example.com' },
      {  name: 'Bob',  age:71,email: 'bob@example.com' },
      {  name: 'Charlie', age:62, email: 'charlie@example.com' },
      {  name: 'Alice',  age:53, email: 'alic@example.com' },
      {  name: 'Bobe',  age:44,email: 'bobo@example.com' },
      {  name: 'Charl', age:25, email: 'chare@example.com' } 
    
    ];

    const usersOver25 = users.filter(user => user.age > 25);


    console.log(`users older than 25:`);
    console.log(usersOver25); //this use for a print the filtered the array value 