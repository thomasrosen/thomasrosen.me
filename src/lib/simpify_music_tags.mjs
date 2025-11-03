// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: its okay here
export function simpify_music_tags(tag) {
  if (typeof tag !== 'string') {
    return []
  }

  if (
    [
      '', // empty tag
      'Worldwide',
      'Compilation',
      'Vocal',
      'Easy Listening',
      'TV Soundtrack',
      'Comedy',
      'Instrumental',
      'Soundtrack',
      'Singer/Songwriter',
      'Urbano latino',
      'Musicals',
      'EMO',
      'Original Score',
      "Jungle/Drum'n'bass",
      'New Age',
    ].includes(tag)
  ) {
    // remove these tags
    return []
  }

  if (tag === 'Ska') {
    return ['Reggae']
  }

  if (['Christian', 'Religious', 'Holiday'].includes(tag)) {
    return ['Religious']
  }

  if (['Electronica', 'Techno', 'Dance', 'House'].includes(tag)) {
    return ['Electronic']
  }
  if (tag === 'Afro House') {
    return ['Electronic'] // ['House']
  }
  if (['Hip Hop/Rap', 'Hip-Hop/Rap', 'Alternative Rap', 'Hip Hop'].includes(tag)) {
    return ['Hip-Hop/Rap']
  }
  if (tag === 'Pop/Rock') {
    return ['Pop', 'Rock']
  }
  if (tag === 'Alternative Folk' || tag === 'German Folk') {
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
  if (['Indie Rock', 'Hard Rock', 'Prog-Rock/Art Rock', 'Soft Rock'].includes(tag)) {
    return ['Rock']
  }
  if (['German Pop', 'French Pop', 'Indie Pop', 'K-Pop', 'Pop Latino', 'Teen Pop'].includes(tag)) {
    return ['Pop']
  }

  return [tag]
}
