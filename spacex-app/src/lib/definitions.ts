export type SimpleLaunch = {
  id: string,
  launch_date_local: string,
  mission_name: string,
  upcoming: boolean,
  rocket : { rocket_name: string },        
  links : {
    flickr_images: string[],
    mission_patch: string,
    mission_patch_small: string
  }
}

export type PageDetailLaunch = {
  details: string,
  launch_date_local: string,
  launch_site: { site_name: string },
  links: {
    flickr_images: string[],
    mission_patch: string,
    mission_patch_small: string,
  }
  mission_name: string,
  rocket: {
    rocket: {
      company: string,
      country: string,
      description: string,
      diameter: { meters: number },
      height: { meters: number },
      name: string,
      payload_weights: {
        id: string,
        kg: number,
        lb: number,
        name: string
      }
    }
  }
}

export type ModalDetailLaunch = {
  details: string,
  launch_date_local: string,
  mission_name: string,
  rocket: {
    rocket_name: string,
    rocket: {
      success_rate_pct: number,
    }
  }
}
