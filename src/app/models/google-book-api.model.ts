export interface IndustryIdentifier {
  identifier: string;
}

export interface VolumeInfo {
  title: string;
  authors: string[];
  publishedDate: string;
  industryIdentifiers: IndustryIdentifier[];
}

export interface GoogleBookApiItems {
  volumeInfo: VolumeInfo;
}

export interface SearchResults {
  pageSize: number;
  page: number;
  items: GoogleBookApiItems[];
}
