import { HttpHeaders } from '@angular/common/http'; 


export interface httpOptions{
    headers?: HttpHeaders,
    observe?: any,
    responseType?: any
}

export interface apiResponse {
    results: starship[];
}

export interface starship{
    url: string | null;
    img_url?: string;
    name: string;
    model: string;
    id?: string | null;
    manufacturer?: string;
    starship_class?: string;
    cost_in_credits?: string;
    max_atmosphering_speed?: string;
    hyperdrive_rating?: string;
    MGLT?: string;
    length?: string;
    cargo_capacity?: string;
    crew?: string;
    pilots?: string[];
    films?: string[];
}

export interface pilot {
  name?: string,
  id?: string,
  url?: string
}

export interface film {
  title?: string,
  url?: string
}