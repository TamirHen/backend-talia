export interface Cube {
  id: string
  image: string
  name: string
}

export interface BreakPoints {
  menu: string
  mobile: string
  tablet: string
}

export interface SocialMedia {
  behance: string
  dribble: string
  instagram: string
  linkedin: string
  vimeo: string
  whatsapp: string
}

export interface Grid {
  columns: number
  mobile: { columns: number; rows: number }
  rows: number
  tablet: { columns: number; rows: number }
}

export interface Image {
  columnEnd: number
  columnStart: number
  cubeId: number
  mobile: {
    columnEnd: number
    columnStart: number
    rowEnd: number
    rowStart: number
  }
  rowEnd: number
  rowStart: number
  tablet: {
    columnEnd: number
    columnStart: number
    rowEnd: number
    rowStart: number
  }
}

export interface ProjectPage {
  description: string
  grid: Grid
  images: [Image]
  subtitle: string
}

export interface Video {
  projectPage: ProjectPage
  title: string
  videoId: number
}

export interface Contact {
  text: string
  title: string
}

export interface DemoReel {
  videoId: string
}

export interface Home {
  animationImage: string
  riggingImage: string
  sketchesImage: string
}

export interface Pages {
  about: About
  animation?: {
    videos: [Video]
  }
  contact: Contact
  demoReel: DemoReel
  home: Home
  rigging?: {
    videos: [Video]
  }
  sketches?: {
    grid: Grid
    images: [Image]
  }
}

export interface About {
  cv: string
  description: string
  subtitle: string
  title: string
}

export interface HeaderLink {
  name: string
  order: number
}

export interface HeaderLinks {
  about: HeaderLink
  animation: HeaderLink
  contact: HeaderLink
  demoReel: HeaderLink
  rigging: HeaderLink
  sketches: HeaderLink
}

export interface Database {
  breakPoints: BreakPoints
  cubes?: [Cube]
  footerText: string
  headerLinks?: HeaderLinks
  pages: Pages
  socialMedia?: SocialMedia
  subtitle: string
  title: string
}
