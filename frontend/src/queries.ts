import { DocumentNode, gql } from '@apollo/client';

export const GET_SONG_MATCHES: DocumentNode = gql`
  query getSongMatches(
    $songQuery: String!, $artistQuery: String!, $limit: Int) {
    querySong(songQuery: $songQuery, artistQuery: $artistQuery, limit: $limit) {
      songName
      artistName
      imageUrl
    }
  }
`;
