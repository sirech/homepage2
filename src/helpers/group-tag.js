const groupTag = (tags, limit) => {
  const sortedTags = [...tags].sort((a, b) => {
    return b.count - a.count
  })

  return {
    top: sortedTags.slice(0, limit),
    other: sortedTags.slice(limit),
  }
}

export default groupTag
