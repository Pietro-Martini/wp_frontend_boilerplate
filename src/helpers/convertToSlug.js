export default str => str.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')
