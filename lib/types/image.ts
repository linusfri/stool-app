export type NewImage = {
  kind: 'new';
  data: string; // base64 or file URI
  filename: string;
  mimeType?: string;
};

export type ExistingImage = {
  kind: 'existing';
  id: number;
};

export type ImageResponseData = {
  id: number;
  url: string;
};

/** Could be either a new image or an existing one when creating or updating product from client. */
export type ImageCreateData = NewImage | ExistingImage;
