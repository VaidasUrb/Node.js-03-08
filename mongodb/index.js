import express from 'express'
import mongoose from 'mongoose'

//------------------------------------Sukurtos duonbazes pavadinimas
mongoose.connect('mongodb://localhost/first', (err) => {
    if (!err)
        console.log('Prisijungimas prie duomenu bazes pavyko')
});

const postSchema = new mongoose.Schema({
    content: String,
    data: Date
})

const post = mongoose.model('post', postSchema)

const newPost = new post()
newPost.content = 'Test'
newPost.data = '2022-03-30'
newPost.save()