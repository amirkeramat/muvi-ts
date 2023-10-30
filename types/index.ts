export type Media = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: string[];
  id: number;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  media_type: string;
  first_air_date?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Data = {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page?: number;
  results: Media[];
  total_pages?: number;
  total_results?: number;
};

export type TrailerData = {
  id: number;
  results: Trailer;
  name: string;
  media_type: string;
};

export type Trailer = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type actionList = {
  original_title?: string;
  original_name?: string;
  mediaId: string;
  mediaType?: string;
  backdrop_path?: string;
  release_date?: string;
  poster_path?: string;
  first_air_date?: string;
  vote_average?: string;
};

export type mediaList = {
  userId: string;
  id: string;
  original_title?: string;
  original_name?: string;
  mediaId: string;
  mediaType: string;
  backdrop_path?: string;
  release_date?: string;
  poster_path?: string;
  first_air_date?: string;
  vote_average?: string;
  createdAt: string;
};

export type userMediaList = {
  page: string;
  results: mediaList[];
  total_pages: number;
  total_results: number;
};
