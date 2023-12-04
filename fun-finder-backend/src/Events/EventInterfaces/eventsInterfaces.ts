export interface GoogleApiQueryObject {
  includedTypes: string;
  maxResultCount: number;
  locationRestriction: GoogleApiLocationRestriction;
}
export interface GoogleApiLocationRestriction {
  circle: {
    center: {
      latitude: number;
      longitude: number;
    };
    radius: number;
  };
}
export interface GoogleApiQueryResponse {
  places: GoogleApiPlacesResponse[];
}

export interface GoogleApiPlacesResponse {
  types: string[];
  formattedAddress: string;
  websiteUri: string;
  displayName: {
    text: string;
    languageCode: string;
  };
  iconMaskBaseUri: string;
  rating: number;
}
