/* eslint-disable no-unused-vars */
const dummy = (array) => {
  return 1
}
const totalLikes = (blogList) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  const totalLikes = blogList.map(blog => blog.likes).reduce(reducer)
  return totalLikes
}

const favoriteBlog = (blogList) => {
  const reducer = (accumulator, currentValue) => accumulator > currentValue ? accumulator : currentValue
  const mostLikes = blogList.map(blog => blog.likes).reduce(reducer)
  return mostLikes
}
module.exports = {
  dummy, totalLikes, favoriteBlog
}