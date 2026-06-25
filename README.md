roadmap project to create a backend system for a workout tracker application where users can sign up, log in, create workout plans, and track their progress. 

https://roadmap.sh/projects/fitness-workout-tracker

The system will feature JWT authentication, CRUD operations for workouts, and generate reports on past workouts.

# REGISTER USER

POST {{baseurl}}/register

    {name, email, password}


# POST LOGIN

POST {{baseurl}}/login 

    {email, password}


# POST LOGOUT

POST {{baseurl}}/logout 


    "Authorization": "Bearer {{Token}}"


# LIST WORKOUTS

### Use to generate report from pending workouts

GET {{baseurl}}/listworkout 


    "Authorization": "Bearer {{Token}}"


# REPORT WORKOUTS

### Use to generate report from completed workouts

    GET {{baseurl}}/generatereport 
    
    "Authorization": "Bearer {{Token}}"


# POST/PUT/DELETE WORKOUTS add/update/delete/schedule

### Use to create and populate the workout with exercises and all of them need a token

    POST {{baseurl}}/addworkout -- using {Name, Exercises by id with sets, reps and weight}
    
    PUT {{baseurl}}/updateworkout -- using { any option above + comment, status['pending'], ['completed']} 
    
    PUT {{baseurl}}/scheduleworkout -- using {schedule: Date}
    
    DELETE {{baseurl}}/deleteworkout/:name

    "Authorization": "Bearer {{Token}}"

