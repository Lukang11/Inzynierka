// create-place.dto.ts
export class CreatePlaceDto {
  types: string[];
  formattedAddress: string;
  websiteUri: string;
  displayName: {
    text: string;
    languageCode: string;
  };
  iconMaskBaseUri: string;
}
