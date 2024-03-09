export type SimpleLaunch = {
  id: string,
  launch_date_local: string,
  launch_success: boolean,
  mission_name: string,
  upcoming: boolean,
  rocket : { rocket_name: string },        
  links : {
    flickr_images: string[],
    mission_patch: string,
    mission_patch_small: string
  }
}