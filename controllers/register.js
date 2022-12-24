const handleRegister = (req,res,db,bcrypt) => {
    const {email, name, password} = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password,11)
        db.transaction(trx => {
            trx.insert({
                hash:hash,
                email:email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*') // a method in knex that returns all the columns of the entered user
                .insert({
                    email: loginEmail[0].email,
                    name: name,
                    joined: new Date()
                })
                .then(user =>{
                    res.json(user[0])
                })
            })
            .then(trx.commit)   // To add to the db
            .catch(trx.rollback)   // In case of an error rollback
        })
        .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleRegister : handleRegister
}