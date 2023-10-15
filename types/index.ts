export type Media = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: string[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
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
