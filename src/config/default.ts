module.exports = {
    name: 'blog',
    description: 'wirte everything',
    port: 8000,
    session: {
      secret: 'myblog',
      key: 'myblog',
      maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/myblog'
}