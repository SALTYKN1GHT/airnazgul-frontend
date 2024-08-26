export interface Destination {
  id: number;
  realm: string;
  settlement: string;
  dest_code: string;
  x_coordinate: number;
  y_coordinate: number;
}
export interface ShortDest {
  destCode: string;
  imgUrl: string;
  title: string;
}
