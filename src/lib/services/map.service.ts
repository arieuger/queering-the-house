import { supabase } from '$lib/clients/supabaseClient';
import type { FeatureCollection, GeoJsonProperties, Point } from 'geojson';
import { roundCoordinates } from '$lib/utils/utils';

type House = {
  short_id: number;
  location: {
    coordinates: [number, number];
  };
  description: string;
};

type HouseInfo = {
  short_id: number;
  description: string;
  license: string;
  address: string;
  sources: string;
};

export async function fetchIdCoords(): Promise<FeatureCollection<
  Point,
  GeoJsonProperties
> | null> {
  const { data, error } = await supabase
    .from('houses')
    .select('short_id, location')
    .eq('status', 'approved');

  if (error) {
    console.error('Error fetching id and coordinate pairs:', error);
    return null;
  }

  const geoJson: FeatureCollection<Point, GeoJsonProperties> = {
    type: 'FeatureCollection',
    features: (data as House[]).map((house) => ({
      type: 'Feature',
      id: house.short_id,
      geometry: {
        type: 'Point',
        coordinates: roundCoordinates(house.location.coordinates, 6)
      },
      properties: {} // Include properties to match GeoJSON structure
    }))
  };

  return geoJson;
}

export async function fetchIdDescriptions(): Promise<Record<
  number,
  string
> | null> {
  const { data, error } = await supabase
    .from('houses')
    .select('short_id, description')
    .eq('status', 'approved');

  if (error) {
    console.error('Error fetching id and description pairs:', error);
    return null;
  }

  return (data as House[]).reduce(
    (acc, house) => {
      acc[house.short_id] = house.description;
      return acc;
    },
    {} as Record<number, string>
  );
}

export async function getHouseInfoById(
  shortId: string
): Promise<HouseInfo | null> {
  const { data, error } = await supabase
    .from('houses')
    .select('short_id, description, license, address, sources')
    .eq('short_id', shortId);

  if (error) {
    console.error('Error description by id:', error);
    return null;
  }

  if (data) {
    return {
      short_id: data[0].short_id,
      description:
        data[0].description !== null ? <string>data[0].description : '',
      license: data[0].license !== null ? <string>data[0].license : '',
      address: data[0].address !== null ? <string>data[0].address : '',
      sources: data[0].sources !== null ? <string>data[0].sources : ''
    };
  }

  return null;
}
