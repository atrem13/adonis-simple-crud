'use strict'
const Post = use('App/Models/Post')

class PostController {

    async index({request, response, view}) {
        const posts = await Post.all()
        return view.render('posts.index', {posts: posts.rows})
    }

    create ({request, response, view}) {
        return view.render('posts.create')
    }

    async store({request, response, session}) {
        const post = new Post()

        post.title = request.input('title')
        post.content = request.input('content')

        await post.save()

        session.flash({notification: 'Data berhasil ditambahkan'})
        return response.route('posts.index')
    }

    async edit({view, params}){
        const id = params.id
        const post = await Post.find(id)

        return view.render('posts.edit', {post: post})
    }

    async update({request, response, params, session}){
        const id = params.id
        const post = await Post.find(id)

        post.title = request.input('title')
        post.content = request.input('content')
        await post.save()

        session.flash({notification: 'Data berhasil diperbaharui'})

        return response.route('posts.index')
    }

    async delete({request, response, params, session}) {
        const id = params.id
        const post = await Post.find(id)
        await post.delete()

        session.flash({notification: 'Data berhasil dihapus'})
        return response.route('posts.index')
    }

}

module.exports = PostController
