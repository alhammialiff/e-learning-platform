// export interface SectionMultimedia {
//   chapterNumber: number,
//   sectionNumber: number,
//   name: string,
//   sectionContentMultimedia: string
// }
export interface SectionMultimedia {
  sectionNumber: number,
  sectionTitle: string,
  sectionDescription: string,
  sectionOutcome: string,
  sectionContentMultimedia: {
    chapterNumber: number,
    file: File,
    sectionNumber: number
  }
}
