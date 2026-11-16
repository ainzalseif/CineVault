export interface Movie {
  id: string
  title: string
  year: number
  genre: string
  runtime: string
  rating: number
  description: string
  poster: string
  youtubeId?: string
  videoUrl?: string
  featured?: boolean
}

export const movies: Movie[] = [
  {
    id: 'inception',
    title: 'Inception',
    year: 2010,
    genre: 'Sci-Fi',
    runtime: '2h 28m',
    rating: 8.8,
    description: 'A skilled thief who steals secrets through dream-sharing technology is offered a chance to erase his past with one impossible task: inception.',
    poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    youtubeId: 'YoHD9XEInc0',
    featured: true,
  },
  {
    id: 'interstellar',
    title: 'Interstellar',
    year: 2014,
    genre: 'Sci-Fi',
    runtime: '2h 49m',
    rating: 8.7,
    description: 'A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    youtubeId: 'zSWdZVtXT7E',
  },
  {
    id: 'the-dark-knight',
    title: 'The Dark Knight',
    year: 2008,
    genre: 'Action',
    runtime: '2h 32m',
    rating: 9.0,
    description: 'Batman faces the Joker, a criminal mastermind who wants to plunge Gotham City into anarchy.',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    youtubeId: 'EXeTwQWrcwY',
  },
  {
    id: 'dune',
    title: 'Dune',
    year: 2021,
    genre: 'Adventure',
    runtime: '2h 35m',
    rating: 8.0,
    description: 'A gifted young heir travels to the most dangerous planet in the universe to secure his family’s future.',
    poster: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    youtubeId: 'n9xhJrPXop4',
  },
  {
    id: 'spider-man-into-the-spider-verse',
    title: 'Spider-Man: Into the Spider-Verse',
    year: 2018,
    genre: 'Animation',
    runtime: '1h 57m',
    rating: 8.4,
    description: 'Miles Morales becomes Spider-Man and meets heroes from other dimensions who must help him save the multiverse.',
    poster: 'https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
    youtubeId: 'g4Hbz2jLxvQ',
  },
  {
    id: 'big-buck-bunny',
    title: 'Big Buck Bunny',
    year: 2008,
    genre: 'Animation',
    runtime: '10m',
    rating: 7.5,
    description: 'A gentle giant rabbit takes a stand against three mischievous forest bullies in this independently produced animated short.',
    poster: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg',
    videoUrl: 'https://archive.org/download/BigBuckBunny_328/BigBuckBunny_512kb.mp4',
  },
]

export function getMovie(id: string) {
  return movies.find(movie => movie.id === id)
}
