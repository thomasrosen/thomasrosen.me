// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: its okay here
export function simpify_music_tags(tag) {
  if (typeof tag !== 'string') {
    return []
  }

  if (
    [
      'Worldwide',
      'Compilation',
      'Vocal',
      'Easy Listening',
      'TV Soundtrack',
      'Comedy',
      'Instrumental',
      'Soundtrack',
      'Singer/Songwriter',
    ].includes(tag)
  ) {
    // remove these tags
    return []
  }

  if (['Christian', 'Religious', 'Holiday'].includes(tag)) {
    return ['Religious']
  }

  if (tag === 'Electronica') {
    return ['Electronic']
  }
  if (tag === 'Techno') {
    return ['Electronic'] // ['Electronic', 'Techno']
  }
  if (tag === 'Alternative Rap') {
    return ['Rap'] // ['Alternative', 'Rap']
  }
  if (['Hip Hop/Rap', 'Hip-Hop/Rap'].includes(tag)) {
    return ['Hip-Hop', 'Rap']
  }
  if (tag === 'Hip Hop') {
    return ['Hip-Hop']
  }
  if (tag === 'Pop/Rock') {
    return ['Pop', 'Rock']
  }
  if (tag === 'Alternative Folk') {
    return ['Folk'] // ['Alternative', 'Folk']
  }
  if (tag === 'Country & Folk') {
    return ['Country', 'Folk']
  }
  if (tag === 'Classical Crossover') {
    return ['Classical']
  }
  // if (tag === 'R&B/Soul') {
  //   return ['R&B', 'Soul']
  // }
  if (tag === 'Afro House') {
    return ['House']
  }
  if (['Indie Rock', 'Hard Rock', 'Prog-Rock/Art Rock', 'Soft Rock'].includes(tag)) {
    return ['Rock']
  }
  if (['German Pop', 'French Pop', 'Indie Pop', 'K-Pop', 'Pop Latino', 'Teen Pop'].includes(tag)) {
    return ['Pop']
  }

  return [tag]
}
