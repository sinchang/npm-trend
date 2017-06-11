export const getTime = (num) => {
  const now = new Date()
  const formatNow = formatDate(now)
  const ago = now.setMonth(now.getMonth() - parseInt(num, 10))
  const formatAgo = formatDate(ago)
  return `${formatAgo}:${formatNow}`
}

function formatDate (date) {
  date = new Date(date)
  const yyyy = date.getFullYear().toString()
  const mm = (date.getMonth() + 1).toString()
  const dd = date.getDate().toString()
  return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0])
}
