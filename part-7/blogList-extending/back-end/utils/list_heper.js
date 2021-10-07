const _ = require('lodash')

const dummy = () => {
  return 1
}
const totalLikes = (blogList) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  const totalLikes = blogList.map(blog => blog.likes).reduce(reducer)
  return totalLikes
}

const favoriteBlog = blogs => {
  return blogs.reduce((a, b) => (a.likes > b.likes ? a : b))
}

const mostBlog = (blogList) => {
  let countBlog = _.countBy(blogList, (item) => {
    return item.author
  })
  countBlog = _.toPairs(countBlog)
  const blogArray = countBlog.map(item => {return {author: item[0], blog: item[1]}})
  const mostBlog = _.maxBy(blogArray, 'blog')
  return mostBlog
}
const authorMostLikes = (blogList) => {
  const result = blogList.reduce((a, b) => {
    let known = a.find(found => {
      return found.author === b.author
    })
    if (!known) {
      return a.concat({ author: b.author, likes: b.likes })
    }
    known.likes += b.likes
    return a
  }, [])
  return favoriteBlog(result)
  
}
  
module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlog, authorMostLikes
}