import React from 'react';





export default function GenericForm(){
    return(
        <Box
            component='form'
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <SelectMenu name={'students'} options={[]} onChange={() => {}}/>
            <List>
              { errors ? errors.map(error => 
                <ListItem>
                  <ListItemText primary={error} />
                </ListItem>)
                : null 
              }
            </List>
            <Input 
              placeholder='Email'
              defaultValue={email}
              onChange={e => setEmail(e.target.value)} 
              inputProps={{'aria-label': 'description'}} 
              required
            />
            <Input 
              placeholder='Name'
              defaultValue={name}
              onChange={e => setName(e.target.value)} 
              inputProps={{'aria-label': 'description'}} 
              required
            />
            <Input 
              placeholder='Category'
              defaultValue={category}
              onChange={e => setCategory(e.target.value)} 
              inputProps={{'aria-label': 'description'}} 
              required
            />
            <Input 
              placeholder='Problems'
              defaultValue={problems}
              onChange={e => setProblems(e.target.value)} 
              inputProps={{'aria-label': 'description'}} 
              required
            />
            <Input 
              placeholder='Notes'
              defaultValue={notes}
              onChange={e => setNotes(e.target.value)} 
              inputProps={{'aria-label': 'description'}} 
              required
            />
            <Button type='submit'>Create Meeting</Button>
        </Box>
    )
}